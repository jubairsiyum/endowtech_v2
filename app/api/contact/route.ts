import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  MAX_CONTACT_FILE_SIZE_BYTES,
  validateContactFile,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/validations";

const MAX_REQUEST_BYTES = MAX_CONTACT_FILE_SIZE_BYTES + 2 * 1024 * 1024; // 10 MB file + multipart/form fields overhead

function getFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeFilename(rawName: string): string {
  const base = path.basename(rawName || "brief");
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "");
  return (cleaned || "brief").slice(0, 120);
}

function createReferenceId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const suffix = randomUUID().slice(0, 6).toUpperCase();
  return `ET-${stamp}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number.parseInt(contentLengthHeader, 10);
      if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
        return NextResponse.json(
          {
            success: false,
            errors: {
              document:
                "Uploaded payload is too large. Maximum allowed file size is 10 MB.",
            } satisfies ContactFormErrors,
            message:
              "Attachment exceeds the 10 MB maximum upload limit. Please compress or share a link instead.",
          },
          { status: 413 },
        );
      }
    }

    const contentType = (request.headers.get("content-type") || "").toLowerCase();

    let payload: Partial<ContactFormData> = {};
    let uploadedFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = {
        name: getFormString(formData, "name"),
        email: getFormString(formData, "email"),
        phone: getFormString(formData, "phone"),
        company: getFormString(formData, "company"),
        service: getFormString(formData, "service"),
        budget: getFormString(formData, "budget"),
        message: getFormString(formData, "message"),
      };

      const docEntry = formData.get("document");
      if (docEntry instanceof File && (docEntry.name || docEntry.size > 0)) {
        uploadedFile = docEntry;
      }
    } else {
      try {
        const rawJson = (await request.json()) as Record<string, unknown>;
        const asStr = (val: unknown) => (typeof val === "string" ? val : "");
        payload = {
          name: asStr(rawJson?.name),
          email: asStr(rawJson?.email),
          phone: asStr(rawJson?.phone),
          company: asStr(rawJson?.company),
          service: asStr(rawJson?.service),
          budget: asStr(rawJson?.budget),
          message: asStr(rawJson?.message),
        };
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid request payload. Expected JSON or form data.",
          },
          { status: 400 },
        );
      }
    }

    // Validate text fields
    const validation = validateContactForm(payload);
    const errors: ContactFormErrors = { ...validation.errors };

    // Validate attached document if provided
    let attachmentMeta: {
      originalName: string;
      safeName: string;
      size: number;
      type: string;
      sha256: string;
      storedPath: string | null;
    } | null = null;

    if (uploadedFile) {
      const fileError = validateContactFile({
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
      });

      if (fileError) {
        errors.document = fileError;
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Validation failed. Please review your input.",
        },
        { status: 400 },
      );
    }

    const referenceId = createReferenceId();

    if (uploadedFile) {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.byteLength > MAX_CONTACT_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            errors: {
              document: "File is too large. Maximum allowed attachment size is 10 MB.",
            } satisfies ContactFormErrors,
            message: "Attachment exceeds the 10 MB limit.",
          },
          { status: 413 },
        );
      }

      const sha256 = createHash("sha256").update(buffer).digest("hex");
      const safeName = sanitizeFilename(uploadedFile.name);
      const storageDir =
        process.env.CONTACT_UPLOAD_DIR ||
        path.join(os.tmpdir(), "endowtech-contact-uploads");

      let storedPath: string | null = null;
      try {
        await mkdir(storageDir, { recursive: true });
        const targetPath = path.join(storageDir, `${referenceId}-${safeName}`);
        await writeFile(targetPath, buffer);
        storedPath = targetPath;
      } catch (storageErr) {
        console.warn(
          "[Contact Upload Storage Warning]: Could not persist attachment to disk; keeping buffer in memory for downstream dispatch.",
          storageErr,
        );
      }

      attachmentMeta = {
        originalName: uploadedFile.name,
        safeName,
        size: buffer.byteLength,
        type: uploadedFile.type || "application/octet-stream",
        sha256,
        storedPath,
      };
    }

    const name = payload.name?.trim() || "";
    const email = payload.email?.trim() || "";
    const phone = payload.phone?.trim() || "";
    const company = payload.company?.trim() || "";
    const service = payload.service?.trim() || "";
    const budget = payload.budget?.trim() || "";
    const message = payload.message?.trim() || "";

    // Log received lead details securely on server
    console.log("[New Lead Inquiry Received]:", {
      referenceId,
      name,
      email,
      phone: phone || "Not specified",
      company: company || "Not specified",
      service: service || "Not specified",
      budget: budget || "Not specified",
      messageLength: message.length,
      attachment: attachmentMeta
        ? {
            name: attachmentMeta.originalName,
            size: attachmentMeta.size,
            type: attachmentMeta.type,
            sha256: attachmentMeta.sha256,
            stored: Boolean(attachmentMeta.storedPath),
          }
        : null,
      timestamp: new Date().toISOString(),
    });

    // If an external email provider or CRM webhook is configured, dispatch here with attachment buffer/path:
    // e.g. await sendEmail({ to: 'hello@endowtech.net', from: email, attachments: [...] })

    return NextResponse.json({
      success: true,
      referenceId,
      message: attachmentMeta
        ? "Thank you! Your inquiry and attached project brief have been received. Our team will contact you within 24 hours."
        : "Thank you! Your inquiry has been received. Our team will contact you within 24 hours.",
      received: {
        phoneProvided: Boolean(phone),
        hasAttachment: Boolean(attachmentMeta),
        attachment: attachmentMeta
          ? {
              name: attachmentMeta.originalName,
              size: attachmentMeta.size,
              type: attachmentMeta.type,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error processing inquiry. Please reach out via WhatsApp.",
      },
      { status: 500 },
    );
  }
}

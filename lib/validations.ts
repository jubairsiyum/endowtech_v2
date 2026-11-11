export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  documentName?: string;
  documentSize?: number;
  documentType?: string;
}

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData | "document", string>
>;

export interface ValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

export interface ValidateContactOptions {
  phoneRequired?: boolean;
}

export const MAX_CONTACT_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_CONTACT_FILE_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".png",
  ".jpg",
] as const;

export const ALLOWED_CONTACT_FILE_ACCEPT =
  ALLOWED_CONTACT_FILE_EXTENSIONS.join(",");

const ALLOWED_CONTACT_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/octet-stream",
]);

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function validatePhoneNumber(phone?: string): string | null {
  if (!phone || !phone.trim()) return null;
  const trimmed = phone.trim();

  if (!/^[+\d\s().-]+$/.test(trimmed)) {
    return "Please enter a valid phone number using digits, spaces, +, -, or ().";
  }

  const digitCount = trimmed.replace(/\D/g, "").length;
  if (digitCount < 7 || digitCount > 15) {
    return "Please enter a valid phone number (7-15 digits).";
  }

  return null;
}

export function validateContactFile(file: {
  name: string;
  size: number;
  type?: string;
}): string | null {
  const name = file.name?.trim() || "";
  const dotIdx = name.lastIndexOf(".");
  const ext = dotIdx >= 0 ? name.slice(dotIdx).toLowerCase() : "";

  if (
    !ext ||
    !(ALLOWED_CONTACT_FILE_EXTENSIONS as readonly string[]).includes(ext)
  ) {
    return "Unsupported file format. Please upload a PDF, DOCX, PNG, or JPG file.";
  }

  if (file.size <= 0) {
    return "The selected file is empty. Please choose a valid document.";
  }

  if (file.size > MAX_CONTACT_FILE_SIZE_BYTES) {
    return "File is too large. Maximum allowed attachment size is 10 MB.";
  }

  const mime = file.type?.trim().toLowerCase();
  if (mime && !ALLOWED_CONTACT_MIME_TYPES.has(mime)) {
    return "Unsupported file type detected. Please upload a PDF, DOCX, PNG, or JPG file.";
  }

  return null;
}

export function validateContactForm(
  data: Partial<ContactFormData>,
  options: ValidateContactOptions = {},
): ValidationResult {
  const errors: ContactFormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please provide your full name (minimum 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please provide a valid work or business email address.";
  }

  const phoneValue = data.phone?.trim() ?? "";
  if (options.phoneRequired && !phoneValue) {
    errors.phone = "Please provide a valid phone or WhatsApp number.";
  } else if (phoneValue) {
    const phoneErr = validatePhoneNumber(phoneValue);
    if (phoneErr) errors.phone = phoneErr;
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message =
      "Please share a brief description of your project or goals (minimum 10 characters).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

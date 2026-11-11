"use client";

import { FlowButton } from "@/components/ui/FlowButton";
import { contactBudgetOptions, contactServiceOptions } from "@/data/contact";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import {
  ALLOWED_CONTACT_FILE_ACCEPT,
  formatFileSize,
  validateContactFile,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/validations";
import { Check, FileText, ShieldCheck, Upload, X } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

export interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showPhoneField?: boolean;
  phoneRequired?: boolean;
  showCompanyField?: boolean;
  showBudgetField?: boolean;
  showDocumentField?: boolean;
  defaultService?: string;
  submitLabel?: string;
  ndaNote?: string;
  variant?: "elevated" | "bordered" | "minimal";
  idPrefix?: string;
  nameInputRef?: React.RefObject<HTMLInputElement>;
  onSuccess?: (data: ContactFormData) => void;
  className?: string;
}

export function ContactForm({
  title = "Brief the team.",
  subtitle = "A short brief is enough.",
  showHeader = true,
  showPhoneField = true,
  phoneRequired = false,
  showCompanyField = true,
  showBudgetField = false,
  showDocumentField = true,
  defaultService = contactServiceOptions[0],
  submitLabel = "Start the conversation",
  ndaNote = "* NDA available upon request · Response within 24 hours",
  variant = "elevated",
  idPrefix = "brief",
  nameInputRef,
  onSuccess,
  className,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultService,
    budget: "",
    message: "",
  });

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [submittedDocName, setSubmittedDocName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const applySelectedFile = (file: File | null) => {
    if (!file) return;

    const fileError = validateContactFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (fileError) {
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors((prev) => ({ ...prev, document: fileError }));
      return;
    }

    setAttachedFile(file);
    setErrors((prev) => ({ ...prev, document: undefined }));
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    applySelectedFile(file);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, document: undefined }));
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    applySelectedFile(droppedFile);
  };

  const handleDropzoneKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateContactForm(formData, { phoneRequired });
    const nextErrors: ContactFormErrors = { ...validation.errors };

    if (showDocumentField && attachedFile) {
      const fileError = validateContactFile({
        name: attachedFile.name,
        size: attachedFile.size,
        type: attachedFile.type,
      });
      if (fileError) nextErrors.document = fileError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      const summaryPayload: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        ...(showPhoneField && formData.phone?.trim()
          ? { phone: formData.phone.trim() }
          : {}),
        ...(showCompanyField && formData.company?.trim()
          ? { company: formData.company.trim() }
          : {}),
        service: formData.service,
        ...(showBudgetField && formData.budget?.trim()
          ? { budget: formData.budget.trim() }
          : {}),
        message: formData.message.trim(),
        ...(showDocumentField && attachedFile
          ? {
              documentName: attachedFile.name,
              documentSize: attachedFile.size,
              documentType: attachedFile.type,
            }
          : {}),
      };

      const body = new FormData();
      body.append("name", summaryPayload.name);
      body.append("email", summaryPayload.email);
      if (summaryPayload.phone) body.append("phone", summaryPayload.phone);
      if (summaryPayload.company) {
        body.append("company", summaryPayload.company);
      }
      if (summaryPayload.service)
        body.append("service", summaryPayload.service);
      if (summaryPayload.budget) body.append("budget", summaryPayload.budget);
      body.append("message", summaryPayload.message);
      if (showDocumentField && attachedFile) {
        body.append("document", attachedFile, attachedFile.name);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedRefId(data.referenceId ?? null);
        setSubmittedDocName(
          data.received?.attachment?.name ?? attachedFile?.name ?? null,
        );
        setSubmitted(true);
        onSuccess?.(summaryPayload);
      } else {
        if (data.errors && typeof data.errors === "object") {
          setErrors(data.errors as ContactFormErrors);
        }
        setSubmitError(
          data.message ||
            "Something went wrong. Please review your details and try again.",
        );
      }
    } catch {
      setSubmitError(
        "Network error submitting inquiry. Please connect with us directly via email or WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedRefId(null);
    setSubmittedDocName(null);
    setErrors({});
    setSubmitError(null);
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService,
      budget: "",
      message: "",
    });
  };

  const containerStyles = {
    elevated:
      "rounded-3xl bg-white border border-neutral-200/90 shadow-[0_24px_70px_-18px_rgba(15,0,0,0.12),0_0_0_1px_rgba(220,38,38,0.05)] p-6 sm:p-8 lg:p-9",
    bordered:
      "rounded-2xl bg-white border border-gray-200/90 shadow-xl p-7 sm:p-9",
    minimal: "bg-transparent p-0",
  }[variant];

  const inputBaseClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-[#f7f7f9] border border-neutral-200/90 text-sm text-[#0f0000] placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200";

  const showRow2TwoCols = showPhoneField && showCompanyField;
  const showRow2Any = showPhoneField || showCompanyField;

  return (
    <div className={cn("relative", containerStyles, className)}>
      {submitted ? (
        <div className="py-10 sm:py-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mb-5 shadow-sm">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-700 font-semibold mb-2">
            Brief Received{submittedRefId ? ` · ${submittedRefId}` : ""}
          </span>
          <h3 className="text-2xl font-bold text-[#0f0000] tracking-tight mb-2">
            Your project brief is in our queue.
          </h3>
          <p className="text-neutral-600 text-sm max-w-sm leading-relaxed">
            Our CEO and engineering lead are reviewing your context and will
            reply to{" "}
            <strong className="font-semibold text-[#0f0000]">
              {formData.email}
            </strong>{" "}
            within 24 hours.
          </p>
          {submittedDocName && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200/80 text-xs text-neutral-700 font-medium max-w-full">
              <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">Attached: {submittedDocName}</span>
            </div>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-accent uppercase font-bold hover:underline cursor-pointer"
            >
              Send another brief →
            </button>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-500 hover:text-[#0f0000] transition-colors"
            >
              Need faster response? WhatsApp →
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {showHeader && (
            <div className="pb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f0000] tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {submitError && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"
            >
              {submitError}
            </div>
          )}

          {/* Row 1: Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${idPrefix}-name`}
                className="block text-xs font-semibold text-[#0f0000] mb-1.5"
              >
                Full name <span className="text-accent">*</span>
              </label>
              <input
                ref={nameInputRef}
                id={`${idPrefix}-name`}
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? `${idPrefix}-name-error` : undefined
                }
                className={cn(
                  inputBaseClass,
                  errors.name &&
                    "border-red-400 bg-red-50/40 focus:ring-red-200",
                )}
              />
              {errors.name && (
                <p
                  id={`${idPrefix}-name-error`}
                  className="text-[11px] text-red-600 mt-1 font-medium"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${idPrefix}-email`}
                className="block text-xs font-semibold text-[#0f0000] mb-1.5"
              >
                Work email <span className="text-accent">*</span>
              </label>
              <input
                id={`${idPrefix}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? `${idPrefix}-email-error` : undefined
                }
                className={cn(
                  inputBaseClass,
                  errors.email &&
                    "border-red-400 bg-red-50/40 focus:ring-red-200",
                )}
              />
              {errors.email && (
                <p
                  id={`${idPrefix}-email-error`}
                  className="text-[11px] text-red-600 mt-1 font-medium"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Number & Company */}
          {showRow2Any && (
            <div
              className={cn(
                "grid grid-cols-1 gap-4",
                showRow2TwoCols ? "sm:grid-cols-2" : "sm:grid-cols-1",
              )}
            >
              {showPhoneField && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={`${idPrefix}-phone`}
                      className="block text-xs font-semibold text-[#0f0000]"
                    >
                      Phone number{" "}
                      {phoneRequired && <span className="text-accent">*</span>}
                    </label>
                    {!phoneRequired && (
                      <span className="text-[11px] text-neutral-400">
                        Optional
                      </span>
                    )}
                  </div>
                  <input
                    id={`${idPrefix}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required={phoneRequired}
                    autoComplete="tel"
                    value={formData.phone ?? ""}
                    onChange={handleChange}
                    placeholder="Enter Your Phone"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? `${idPrefix}-phone-error` : undefined
                    }
                    className={cn(
                      inputBaseClass,
                      errors.phone &&
                        "border-red-400 bg-red-50/40 focus:ring-red-200",
                    )}
                  />
                  {errors.phone && (
                    <p
                      id={`${idPrefix}-phone-error`}
                      className="text-[11px] text-red-600 mt-1 font-medium"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              )}

              {showCompanyField && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={`${idPrefix}-company`}
                      className="block text-xs font-semibold text-[#0f0000]"
                    >
                      Company
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      Optional
                    </span>
                  </div>
                  <input
                    id={`${idPrefix}-company`}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company ?? ""}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={inputBaseClass}
                  />
                </div>
              )}
            </div>
          )}

          {/* Row 3: Service Interest & Estimated Budget */}
          <div
            className={cn(
              "grid grid-cols-1 gap-4",
              showBudgetField ? "sm:grid-cols-2" : "sm:grid-cols-1",
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${idPrefix}-service`}
                  className="block text-xs font-semibold text-[#0f0000]"
                >
                  What do you need help with?
                </label>
                <span className="text-[11px] text-neutral-400">Optional</span>
              </div>
              <select
                id={`${idPrefix}-service`}
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={cn(inputBaseClass, "cursor-pointer")}
              >
                {contactServiceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {showBudgetField && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor={`${idPrefix}-budget`}
                    className="block text-xs font-semibold text-[#0f0000]"
                  >
                    Estimated Budget
                  </label>
                  <span className="text-[11px] text-neutral-400">Optional</span>
                </div>
                <select
                  id={`${idPrefix}-budget`}
                  name="budget"
                  value={formData.budget ?? ""}
                  onChange={handleChange}
                  className={cn(
                    inputBaseClass,
                    "cursor-pointer",
                    !formData.budget && "text-neutral-400",
                  )}
                >
                  <option value="" className="text-neutral-500">
                    Select budget range
                  </option>
                  {contactBudgetOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="text-[#0f0000]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Row 4: Project Context Textarea */}
          <div>
            <label
              htmlFor={`${idPrefix}-message`}
              className="block text-xs font-semibold text-[#0f0000] mb-1.5"
            >
              Project context <span className="text-accent">*</span>
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="What are you trying to build, modernize, or scale?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? `${idPrefix}-message-error` : undefined
              }
              className={cn(
                inputBaseClass,
                "resize-none",
                errors.message &&
                  "border-red-400 bg-red-50/40 focus:ring-red-200",
              )}
            />
            {errors.message && (
              <p
                id={`${idPrefix}-message-error`}
                className="text-[11px] text-red-600 mt-1 font-medium"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Row 5: Optional Document / Brief Upload */}
          {showDocumentField && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${idPrefix}-document`}
                  className="block text-xs font-semibold text-[#0f0000]"
                >
                  Document / brief upload
                </label>
                <span className="text-[11px] text-neutral-400">Optional</span>
              </div>

              <input
                ref={fileInputRef}
                id={`${idPrefix}-document`}
                name="document"
                type="file"
                accept={ALLOWED_CONTACT_FILE_ACCEPT}
                onChange={handleFileInputChange}
                className="sr-only"
              />

              {attachedFile ? (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200/80 bg-red-50/35 px-3.5 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-white border border-red-200/80 text-accent flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#0f0000] truncate">
                        {attachedFile.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        {formatFileSize(attachedFile.size)} · Ready to send
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove attached document"
                    className="w-8 h-8 rounded-lg bg-white border border-neutral-200/90 text-neutral-500 hover:text-accent hover:border-red-200 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={handleDropzoneKeyDown}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  aria-describedby={
                    errors.document
                      ? `${idPrefix}-document-error`
                      : `${idPrefix}-document-hint`
                  }
                  className={cn(
                    "group/drop flex items-center gap-3 rounded-xl border border-dashed px-3.5 py-2.5 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20",
                    isDragging
                      ? "border-accent bg-red-50/45"
                      : errors.document
                        ? "border-red-400 bg-red-50/35"
                        : "border-neutral-300 bg-[#f7f7f9] hover:bg-white hover:border-accent/60",
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200/90 text-[#0f0000] group-hover/drop:text-accent group-hover/drop:border-red-200 flex items-center justify-center transition-colors shrink-0 shadow-xs">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-xs font-medium text-[#0f0000] truncate">
                      Drop your RFP, spec, or brief here, or{" "}
                      <span className="font-semibold text-accent underline underline-offset-2">
                        browse
                      </span>
                    </p>
                    <p
                      id={`${idPrefix}-document-hint`}
                      className="text-[11px] text-neutral-500 truncate mt-0.5"
                    >
                      PDF, DOCX, PNG, or JPG (max 10 MB)
                    </p>
                  </div>
                </div>
              )}

              {errors.document && (
                <p
                  id={`${idPrefix}-document-error`}
                  className="text-[11px] text-red-600 mt-1 font-medium"
                >
                  {errors.document}
                </p>
              )}
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-1">
            <FlowButton
              type="submit"
              disabled={submitting}
              variant="primary"
              size="lg"
              fullWidth
              text={submitting ? "Sending brief..." : submitLabel}
            />
          </div>

          {ndaNote && (
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 text-center pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent/80 shrink-0" />
              <span>{ndaNote}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default ContactForm;

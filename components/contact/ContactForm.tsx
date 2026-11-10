"use client";

import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { FlowButton } from "@/components/ui/FlowButton";
import {
  contactBudgetOptions,
  contactServiceOptions,
} from "@/data/contact";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { validateContactForm, type ContactFormData } from "@/lib/validations";
import { Check, ShieldCheck } from "lucide-react";

export interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showCompanyField?: boolean;
  showBudgetField?: boolean;
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
  showCompanyField = true,
  showBudgetField = false,
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
    company: "",
    service: defaultService,
    budget: contactBudgetOptions[1],
    message: "",
  });

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      const payload: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        ...(showCompanyField && formData.company?.trim()
          ? { company: formData.company.trim() }
          : {}),
        service: formData.service,
        ...(showBudgetField ? { budget: formData.budget } : {}),
        message: formData.message.trim(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        onSuccess?.(payload);
      } else {
        setSubmitError(
          data.message || "Something went wrong. Please review your details and try again.",
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
    setErrors({});
    setSubmitError(null);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: defaultService,
      budget: contactBudgetOptions[1],
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
    "w-full px-3.5 py-3 rounded-xl bg-[#f7f7f9] border border-neutral-200/90 text-sm text-[#0f0000] placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200";

  return (
    <div className={cn("relative", containerStyles, className)}>
      {submitted ? (
        <div className="py-10 sm:py-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mb-5 shadow-sm">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-700 font-semibold mb-2">
            Brief Received
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
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                placeholder="Alex Vance"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
                className={cn(
                  inputBaseClass,
                  errors.name && "border-red-400 bg-red-50/40 focus:ring-red-200",
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
                aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
                className={cn(
                  inputBaseClass,
                  errors.email && "border-red-400 bg-red-50/40 focus:ring-red-200",
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

          {/* Row 2: Company & Service Interest */}
          <div
            className={cn(
              "grid grid-cols-1 gap-4",
              showCompanyField ? "sm:grid-cols-2" : "sm:grid-cols-1",
            )}
          >
            {showCompanyField && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor={`${idPrefix}-company`}
                    className="block text-xs font-semibold text-[#0f0000]"
                  >
                    Company
                  </label>
                  <span className="text-[11px] text-neutral-400">Optional</span>
                </div>
                <input
                  id={`${idPrefix}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company ?? ""}
                  onChange={handleChange}
                  placeholder="Your company name here"
                  className={inputBaseClass}
                />
              </div>
            )}

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
          </div>

          {/* Optional Budget Row */}
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
                value={formData.budget}
                onChange={handleChange}
                className={cn(inputBaseClass, "cursor-pointer")}
              >
                {contactBudgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Project Context Textarea */}
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
              rows={4}
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
                errors.message && "border-red-400 bg-red-50/40 focus:ring-red-200",
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

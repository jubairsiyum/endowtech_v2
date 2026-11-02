export interface ContactFormData {
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(
  data: Partial<ContactFormData>,
): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please provide your full name (minimum 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please provide a valid business email address.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message =
      "Please describe your project or inquiry (minimum 10 characters).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

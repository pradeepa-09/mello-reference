import type { CreateWaitlistDto, ContactMessageDto } from "./types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<string, string[]>;
  data?: T;
}

export function validateWaitlistInput(input: unknown): ValidationResult<CreateWaitlistDto> {
  const errors: Record<string, string[]> = {};

  if (!input || typeof input !== "object") {
    return {
      isValid: false,
      errors: { root: ["Request body must be a valid JSON object."] },
    };
  }

  const raw = input as Record<string, unknown>;

  // Email validation
  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  if (!email) {
    errors.email = ["Email address is required."];
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = ["Please provide a valid email address."];
  } else if (email.length > 254) {
    errors.email = ["Email address exceeds maximum length."];
  }

  // Platform validation
  const platform = raw.platform;
  if (platform !== "macOS" && platform !== "Windows") {
    errors.platform = ["Platform must be either 'macOS' or 'Windows'."];
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      email,
      platform: platform as "macOS" | "Windows",
      source: typeof raw.source === "string" ? raw.source.slice(0, 100) : undefined,
      referrer: typeof raw.referrer === "string" ? raw.referrer.slice(0, 500) : undefined,
    },
  };
}

export function validateContactInput(input: unknown): ValidationResult<ContactMessageDto> {
  const errors: Record<string, string[]> = {};

  if (!input || typeof input !== "object") {
    return {
      isValid: false,
      errors: { root: ["Request body must be a valid JSON object."] },
    };
  }

  const raw = input as Record<string, unknown>;

  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = ["Valid email address is required."];
  }

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (!message || message.length < 5) {
    errors.message = ["Message must be at least 5 characters."];
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      name: typeof raw.name === "string" ? raw.name.trim().slice(0, 100) : undefined,
      email,
      subject: typeof raw.subject === "string" ? raw.subject.trim().slice(0, 200) : undefined,
      message,
    },
  };
}

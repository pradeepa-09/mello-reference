/**
 * Backend Data Transfer Objects (DTOs) & Database Models
 */

export type DesktopPlatform = "macOS" | "Windows";

export interface CreateWaitlistDto {
  email: string;
  platform: DesktopPlatform;
  source?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface WaitlistRecord {
  id: string;
  email: string;
  platform: DesktopPlatform;
  status: "pending" | "accepted" | "invited";
  source?: string;
  referrer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageDto {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

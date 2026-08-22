import { appConfig } from "@/src/shared/lib/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status = 500,
    public readonly code = "API_ERROR",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  readonly baseUrl = appConfig.apiBaseUrl;
  readonly defaultHeaders = { "Content-Type": "application/json" } as const;

  backendNotConfigured(resource: string): never {
    throw new ApiError(
      `The real ${resource} API is not configured. Enable mocks or implement this resource in its API module.`,
      503,
      "BACKEND_NOT_CONFIGURED",
    );
  }

  normalizeError(error: unknown): ApiError {
    if (error instanceof ApiError) return error;
    if (error instanceof Error) return new ApiError(error.message);
    return new ApiError("An unexpected API error occurred.");
  }
}

export const apiClient = new ApiClient();

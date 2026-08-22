export const appConfig = {
  useMocks: process.env.NEXT_PUBLIC_USE_MOCKS !== "false",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
} as const;

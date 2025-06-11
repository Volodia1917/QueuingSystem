export const config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
  apiTimeout: Number(process.env.REACT_APP_API_TIMEOUT) || 5000,
  debugMode: process.env.REACT_APP_DEBUG_MODE === "true",
  environment: process.env.NODE_ENV || "development",
} as const;

if (!config.backendUrl) {
  throw new Error(
    "REACT_APP_BACKEND_URL is not set. Please follow these steps: 1. add it to your .env file, 2. restart application"
  );
}

export type Config = typeof config;

export const isDevelopment = config.environment === "development";
export const isProduction = config.environment === "production";

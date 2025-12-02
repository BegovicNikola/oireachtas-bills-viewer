/**
 * API Constants
 * Base URL and endpoint configurations for the Oireachtas API
 */

export const API_BASE_URL = "https://api.oireachtas.ie/v1";

export const API_ENDPOINTS = {
  LEGISLATION: `${API_BASE_URL}/legislation`,
} as const;

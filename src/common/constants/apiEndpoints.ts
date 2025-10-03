/**
 * Defines all API endpoints
 */

export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_PREFIX = "/api";

// --- API Service Versions ---
const VERSIONS = {
  auth: "v1",
  reporting: "v1",
  jurisdiction: "v1",
};

const AUTH_BASE = `${API_PREFIX}/${VERSIONS.auth}/auth`;
const JURISDICTION_BASE = `${API_PREFIX}/${VERSIONS.jurisdiction}/jurisdictions`;
const REPORTING_BASE = `${API_PREFIX}/${VERSIONS.reporting}/reports`;

export const API_ENDPOINTS = {
  auth: {
    register: `${AUTH_BASE}/register`,
    login: `${AUTH_BASE}/login`,
  },

  jurisdiction: {
    get: `${JURISDICTION_BASE}/isUserLocationSupported`,
  },

  reporting: {
    getActiveSummaries: `${REPORTING_BASE}/active-summaries`,
    getIdReport: (id: number) => `${REPORTING_BASE}/${id}`,
    postUserReport: REPORTING_BASE,
  },
};

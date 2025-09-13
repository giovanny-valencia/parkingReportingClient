import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { HttpStatusCode } from "axios";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import authService from "@features/auth/services/authService";

/**
 * --- API Client Configuration ---
 * This file creates and configures a single, reusable Axios instance.
 * All API requests should be made using this client to ensure consistent headers
 * and centralized handling of authentication and errors.
 */

// Safely retrieve the base URL from the app's configuration
//const BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BASE_URL;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("EXPO_PUBLIC_BASE_URL is not set in app.config.ts");
}

/**
 * The primary API client instance.
 * Configured with the base URL and default headers.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * --- Request Interceptor ---
 * This interceptor is executed before every API request.
 * It is used to attach the user's authentication token to the request's headers.
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Get the token from secure storage
    const { token } = useAuthStore.getState();

    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * --- Response Interceptor ---
 * This interceptor is executed for every API response.
 *
 * Global handler for universal errors that require a consistent action across entire application.
 * For example, 401 res. invalid user token means that the user should be logged out.
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle errors globally
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      // You can add logic here to log out the user or refresh the token
      // await SecureStore.deleteItemAsync("userAuthToken");
      // const { clearAuth } = useAuthStore.getState();
      // clearAuth();
      authService.logout;
      // Redirect to login screen is handled by _layout's hydration
    }
    return Promise.reject(error);
  }
);

export default apiClient;

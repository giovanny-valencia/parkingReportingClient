import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

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
    const token = await SecureStore.getItemAsync("userAuthToken");

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
 * review this later
 */

/**
 * --- Response Interceptor ---
 * This interceptor is executed for every API response.
 * It is used for centralized error handling, specifically for handling
 * unauthorized (401) responses to log the user out.
 */
// TODO: review the error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // You can add logic here to log out the user or refresh the token
      console.error("Unauthorized request. Logging out...");
      await SecureStore.deleteItemAsync("userAuthToken");
      // Redirect to login screen if necessary
    }
    return Promise.reject(error);
  }
);

export default apiClient;

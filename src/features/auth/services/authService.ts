import { HttpStatusCode, isAxiosError } from "axios";
import apiClient from "common/api/apiClient";
import { LoginCredentialsDto, RegistrationInputs } from "@features/auth/dtos/Auth";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/useAuthStore";

const loginEndPoint = "/api/v1/auth/login";

/**
 * Handles user login by sending credentials to the backend API.
 * @param {LoginCredentialsDto} loginCredentials - The user's email and password.
 * @returns {Promise<any>} The response data from the backend, including the JWT token.
 * @throws {Error} Throws a specific error message based on the HTTP status code or network issues.
 */
async function login(loginCredentials: LoginCredentialsDto): Promise<any> {
  const { refreshAuth } = useAuthStore.getState();
  try {
    const response = await apiClient.post(loginEndPoint, loginCredentials);

    const { token } = response.data;

    await SecureStore.setItemAsync("userAuthToken", token);
    refreshAuth();

    return token;
  } catch (error: unknown) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (isAxiosError(error) && error.response) {
      const status = error.response.status;

      if (status === HttpStatusCode.Unauthorized || status === HttpStatusCode.NotFound) {
        throw new Error("Incorrect email or password");
      } else if (status >= HttpStatusCode.InternalServerError) {
        throw new Error("Server error. Please try again later.");
      } else {
        // Handle other client errors (e.g., 400 Bad Request)
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } else if (isAxiosError(error) && error.request) {
      // The request was made but no response was received
      throw new Error("Error connecting to the internet. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("An unknown error occurred. Try again later.");
    }
  }
}

async function register() {}

async function logout() {
  const { refreshAuth } = useAuthStore.getState();

  await SecureStore.deleteItemAsync("userAuthToken");
  refreshAuth();
}

const authService = {
  login,
  register,
  logout,
};

export default authService;

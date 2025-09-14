import { HttpStatusCode } from "axios";
import apiClient from "common/api/apiClient";
import { LoginCredentialsDto, RegistrationDto } from "@features/auth/dtos/Auth";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/useAuthStore";

const loginEndPoint = "/api/v1/auth/login";

/**
 * Handles user login by sending credentials to the backend API.
 * @param {LoginCredentialsDto} loginCredentials - The user's email and password.
 * @returns {Promise<any>} The response data from the backend, including the JWT token.
 * @throws {Error} Throws a specific error message based on the HTTP status code or network issues.
 */
//TODO: explicit return type
async function login(loginCredentials: LoginCredentialsDto): Promise<any> {
  try {
    const response = await apiClient.post(loginEndPoint, loginCredentials);

    const { token } = response.data;

    await SecureStore.setItemAsync("userAuthToken", token);

    return token;
  } catch (error: any) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response) {
      if (
        error.response.status === HttpStatusCode.Unauthorized ||
        error.response.status === HttpStatusCode.NotFound
      ) {
        throw new Error("Incorrect email or password");
      } else if (error.response.status >= HttpStatusCode.InternalServerError) {
        throw new Error("Server error. Please try again later.");
      } else {
        // Handle other client errors (e.g., 400 Bad Request)
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        "Error connecting to the internet. Please check your connection."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("An unknown error occurred. Try again later.");
    }
  }
}

async function register(registrationData: RegistrationDto) {}

async function logout() {
  //logoutRequest: any
  await SecureStore.deleteItemAsync("userAuthToken");
  const { clearAuth } = useAuthStore.getState();
  clearAuth();
}

const authService = {
  login,
  register,
  logout,
};

export default authService;

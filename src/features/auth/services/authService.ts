import Constants from "expo-constants";
import apiClient from "common/api/apiClient";
import { LoginCredentialsDto, RegistrationDto } from "@features/auth/dtos/Auth";

const loginEndPoint = "/api/v1/auth/login";

async function login(loginCredentials: LoginCredentialsDto) {
  try {
    const response = await apiClient.post(loginEndPoint, loginCredentials);
    console.log("response: ", response);

    const { token, type } = response.data;

    //HACK:for testing Jwt response
    //console.log("backend response: ", response.data);
    console.log("token: ", token);
    console.log("type: ", type);

    return response.data;
  } catch (error) {
    console.error("Login Failed: ", error);
    throw error; // calling component will handle
  }
}

async function register(registrationData: RegistrationDto) {}

//TODO: implement logout function
async function logout(logoutRequest: any) {}

const authService = {
  login,
  register,
  logout,
};

export default authService;

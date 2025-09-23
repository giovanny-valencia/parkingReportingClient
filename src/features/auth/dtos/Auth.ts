/**
 * --- Auth Service Data Transfer Objects ---
 * This file contains all the interfaces and types related to the
 * authentication and user service. Grouping them here provides a
 * single source of truth and makes imports cleaner.
 */

/**
 * Interface representing the data required for user login.
 */
export interface LoginCredentialsDto {
  email: string;
  password: string;
}

/**
 * Interface representing the state and inputs of the user registration form on the frontend.
 * This is the "model" for form state.
 */
export interface RegistrationInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
  agreedToTerms: boolean;
}

/**
 * Interface representing the data required for new user registration to be sent to the backend.
 * This is the actual Data Transfer Object (DTO) for the API call.
 */ //TODO: revise
export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
  /** The user's date of birth as an ISO-formatted string (YYYY-MM-DD). */
  dateOfBirth: string;
}

/**
 * Interface representing the user data returned by the API after login or registration.
 */
export interface UserDto {
  userId: number;
  email: string;
  role: "USER" | "OFFICER";
  exp: number;
  iat: number;
}

/**
 * Interface for the data contained within the JWT token payload.
 */
export interface UserJwtPayload {
  userId: number;
  sub: string;
  role: "USER" | "OFFICER";
  exp: number;
  iat: number;
}

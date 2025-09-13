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
 * Interface representing the data required for new user registration.
 */
export interface RegistrationDto {
  email: string;
  password: string;
}

export interface UserDto {
  userId: number;
  email: string;
  role: "USER" | "OFFICER";
}

export interface UserJwtPayload {
  userId: number;
  sub: string;
  role: "USER" | "OFFICER";
}

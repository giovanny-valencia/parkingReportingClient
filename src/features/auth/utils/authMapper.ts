import { RegisterDto, RegistrationInputs, UserDto, UserJwtPayload } from "../dtos/Auth";

/**
 * Maps a decoded JWT payload to the UserDto format.
 * This function transforms the 'sub' field into 'email'.
 * @param payload The decoded JWT payload.
 * @returns The UserDto object.
 */
export function mapJwtPayloadToUserDto(payload: UserJwtPayload): UserDto {
  return {
    userId: payload.userId,
    email: payload.sub,
    role: payload.role,
    exp: payload.exp,
    iat: payload.iat,
  };
}

/**
 * Maps the client-side RegistrationInputs object to a RegisterDto for the backend.
 *
 * This function uses a dedicated helper function to keep the mapping logic clean.
 *
 * @param {RegistrationInputs} form - The user registration data from the frontend form.
 * @returns {RegisterDto} The converted payload with the date of birth formatted as a YYYY-MM-DD string.
 */
export function mapRegistrationFormToDto(form: RegistrationInputs): RegisterDto {
  return {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    agreedToTerms: form.agreedToTerms,
    dateOfBirth: convertDOBToString(form.dateOfBirth),
  };
}

/**
 * Converts a Date object into a YYYY-MM-DD formatted string.
 *
 * @param date - The date to convert.
 * @returns {string} The formatted date string.
 */
function convertDOBToString(date: Date) {
  const year = date.getFullYear();
  // month is 0 indexed, add 1.
  // pad start turns into digit values into 2 digits with leading 0. Ex: 01 instead of 1
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

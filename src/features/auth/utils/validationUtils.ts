/**
 * @file A collection of utility functions to validate various user inputs for a registration form.
 * Each function is a pure function, returning an array of error messages or an empty array if the input is valid.
 */

/**
 * Validates a name string for emptiness and format.
 *
 * @param {string} name The name string to validate.
 * @returns {string[]} An array of error messages. The array is empty if the name is valid.
 */
export function validateName(name: string) {
  // Check if name is empty
  if (name.length === 0) {
    return ["Name is required"];
  }

  // Check if name is valid
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(name)) {
    return ["Invalid name: must not contain numbers, special characters, or spaces"];
  }

  return null;
}

/**
 * Validates an email address against a standard regex pattern.
 *
 * @param {string} email The email string to validate.
 * @returns {string[]} An array of error messages. The array is empty if the email is valid.
 */
export function validateEmail(email: string): string[] {
  // Check if email is empty
  if (email.length === 0) {
    return ["Email is required"];
  }

  // Check if email is valid
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return ["Invalid email format"];
  }

  return [];
}

/**
 * Validates a password string against common security requirements.
 *
 * @param {string} password The password string to validate.
 * @returns {string[]} An array of error messages. The array is empty if the password is valid.
 */
export function validatePassword(password: string): string[] {
  const passwordErrors: string[] = [];

  // Check empty first
  if (password.length === 0) {
    passwordErrors.push("Password is required");
  } else {
    // Length check
    if (password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters long");
    }

    // Number check
    if (!/\d/.test(password)) {
      passwordErrors.push("Password must contain at least one number");
    }

    // Special character check
    if (!/[^a-zA-Z0-9]/.test(password)) {
      passwordErrors.push("Password must contain at least one special character");
    }

    // Uppercase check
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Password must contain at least one uppercase letter");
    }
  }

  return passwordErrors;
}

/**
 * Validates that the password and password confirmation fields match.
 *
 * @param {string} password The original password string.
 * @param {string} confirmPassword The password confirmation string.
 * @returns {string[]} An array of error messages. The array is empty if the passwords match.
 */
export function validateConfirmPassword(password: string, confirmPassword: string): string[] {
  if (confirmPassword.length === 0) {
    return ["Password confirmation is required"];
  }
  return password === confirmPassword ? [] : ["Passwords must match"];
}

/**
 * Validates that the date of birth is a valid date and that the user is at least 13 years old.
 *
 * @param {Date} dateOfBirth The date of birth to validate.
 * @returns {string[]} An array of error messages. The array is empty if the date of birth is valid.
 */
export function validateDateOfBirth(dateOfBirth: Date): string[] {
  const MINIMUM_AGE = 18; // this might be revised in the future after some lawyers input.
  const errors: string[] = [];
  const today = new Date();
  const userBirthYear = dateOfBirth.getFullYear();
  const currentYear = today.getFullYear();

  // this shouldn't happen
  if (isNaN(dateOfBirth.getTime())) {
    errors.push("Invalid date of birth");
    return errors; // no point continuing
  }

  let age = currentYear - userBirthYear;
  const monthDifference = today.getMonth() - dateOfBirth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }

  if (age < MINIMUM_AGE) {
    errors.push(`You must be at least ${MINIMUM_AGE} years old to create an account`);
  }

  return errors;
}

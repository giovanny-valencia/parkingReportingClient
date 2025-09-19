import { RegistrationInputs } from "../dtos/Auth";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateDateOfBirth,
} from "./validationUtils";
import { ErrorIndex, createInitialErrors } from "./registrationErrorUtils";

export default function validateRegistrationData(registration: RegistrationInputs) {
  let updatedErrors = createInitialErrors(); // creates a cleared no error array

  const firstNameErrorMessage = validateName(registration.firstName);
  if (firstNameErrorMessage) {
    updatedErrors[ErrorIndex.FIRST_NAME].message = firstNameErrorMessage;
  }

  const lastNameErrorMessage = validateName(registration.lastName);
  if (lastNameErrorMessage) {
    updatedErrors[ErrorIndex.LAST_NAME].message = lastNameErrorMessage;
  }

  const emailErrorMessage = validateEmail(registration.email);
  if (emailErrorMessage) {
    updatedErrors[ErrorIndex.EMAIL].message = emailErrorMessage;
  }

  const passwordErrorMessage = validatePassword(registration.password);
  if (passwordErrorMessage) {
    updatedErrors[ErrorIndex.PASSWORD].message = passwordErrorMessage;
  }

  const confirmPasswordErrorMessage = validateConfirmPassword(
    registration.password,
    registration.confirmPassword
  );
  if (confirmPasswordErrorMessage) {
    updatedErrors[ErrorIndex.CONFIRM_PASSWORD].message = confirmPasswordErrorMessage;
  }

  const dateOfBirthErrorMessage = validateDateOfBirth(registration.dateOfBirth);
  if (dateOfBirthErrorMessage) {
    updatedErrors[ErrorIndex.DATE_OF_BIRTH].message = dateOfBirthErrorMessage;
  }

  return updatedErrors;
}

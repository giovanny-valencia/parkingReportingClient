/**
 * Validates the password field.
 * - LOGIN: Checks if not empty.
 * - SIGNUP:
 *   - Not empty
 *   - At least 8 characters
 *   - At least one number
 *   - At least one special character
 *   - At least one uppercase letter
 */

export enum VALIDATION_TYPE {
  LOGIN,
  SIGNUP,
  // RESET
}

interface passwordProps {
  type: VALIDATION_TYPE;
  password: string;
  handleSetError: (id: number, error: string) => void;
  errorIndex: number;
}

const validators: Record<
  VALIDATION_TYPE,
  (
    password: string,
    handleSetError: (id: number, error: string) => void,
    errorIndex: number
  ) => void
> = {
  [VALIDATION_TYPE.LOGIN]: emptyCheck,
  [VALIDATION_TYPE.SIGNUP]: signUpCheck,
};

function emptyCheck(
  password: string,
  handleSetError: (id: number, error: string) => void,
  errorIndex: number
): void {
  if (password.length === 0) {
    handleSetError(errorIndex, "Password is required");
  } else {
    handleSetError(errorIndex, "");
  }
}

function signUpCheck(
  password: string,
  handleSetError: (id: number, error: string) => void,
  errorIndex: number
): void {
  // Check empty first
  if (password.length === 0) {
    handleSetError(errorIndex, "Password is required");
    return;
  }

  // Length check
  if (password.length < 8) {
    handleSetError(errorIndex, "Password must be at least 8 characters long");
    return;
  }

  // Number check
  if (!/\d/.test(password)) {
    handleSetError(errorIndex, "Password must contain at least one number");
    return;
  }

  // Special character check
  if (!/[^a-zA-Z0-9]/.test(password)) {
    handleSetError(errorIndex, "Password must contain at least one special character");
    return;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    handleSetError(errorIndex, "Password must contain at least one uppercase letter");
    return;
  }

  // All checks passed
  handleSetError(errorIndex, "");
}

export default function validatePassword({
  type,
  password,
  handleSetError,
  errorIndex,
}: passwordProps): void {
  validators[type](password, handleSetError, errorIndex);
}

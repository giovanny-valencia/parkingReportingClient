interface LoginPasswordProps {
  password: string;
  setPasswordError: (error: string) => void;
}
/**
 * Simple validation before sending data to the server.
 * The password field cannot be empty. In the future, likely add password policy requirements to validation
 * before sending to the server.
 *
 * @param password Login password input
 * @param setPasswordError error state for the password field
 * @returns
 */
export default function validateSimpleLoginPassword({
  password,
  setPasswordError,
}: LoginPasswordProps) {
  if (password.length === 0) {
    setPasswordError("Password is required");
    return false;
  }

  setPasswordError("");
  return true;
}

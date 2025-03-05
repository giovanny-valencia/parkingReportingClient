/**
 * Validate name
 *
 * Simple checks:
 * - Name must not be empty
 * - Name must not contain any numbers
 * - Name must not contain any special characters
 * - Name must not contain any spaces
 */

// Utility receives the error's index number, the name checking, and the setter function
interface Fields {
  name: string;
  handleSetError: (id: number, error: string) => void;
  errorIndex: number;
}

export default function validateName({
  name,
  handleSetError,
  errorIndex,
}: Fields) {
  // Check if name is empty
  if (name.length === 0) {
    handleSetError(errorIndex, "Field is required");
    return;
  }

  // Check if name is valid
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(name)) {
    handleSetError(
      errorIndex,
      "Invalid name: must not contain numbers, special characters, or spaces"
    );
    return;
  }

  handleSetError(errorIndex, "");
  return;
}

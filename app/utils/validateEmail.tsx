interface emailProps {
  email: string;
  handleSetError: (id: number, error: string) => void;
  errorIndex: number;
}
export default function validateEmail({ email, handleSetError, errorIndex }: emailProps) {
  // Check if email is empty
  if (email.length === 0) {
    handleSetError(errorIndex, "Email is required");
    return;
  }

  // Check if email is valid
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    handleSetError(errorIndex, "Invalid email");
    return;
  }

  handleSetError(errorIndex, "");
  return;
}

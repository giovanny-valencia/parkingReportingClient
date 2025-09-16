interface emailProps {
  email: string;
  handleSetError: (error: string) => void;
}
export default function validateEmail({ email, handleSetError }: emailProps): boolean {
  // Check if email is empty
  if (email.length === 0) {
    handleSetError("Email is required");
    return false;
  }

  // Check if email is valid
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    handleSetError("Invalid email format");
    return false;
  }

  handleSetError("");
  return true;
}

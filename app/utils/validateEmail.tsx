interface emailProps {
  email: string;
  setError: (error: string) => void;
}

export default function validateEmail({
  email,
  setError: setError,
}: emailProps): boolean {
  // Check if email is empty
  if (email.length === 0) {
    setError("Email is required");
    return false;
  }

  // Check if email is valid
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regex.test(email)) {
    setError("Invalid email");
    return false;
  }

  setError("");
  return true;
}

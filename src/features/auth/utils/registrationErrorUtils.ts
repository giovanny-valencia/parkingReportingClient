/**
 * A constant object to represent the index of each input field.
 * This is more robust than an enum as it exists at runtime.
 */
export const ErrorIndex = {
  FIRST_NAME: 0,
  LAST_NAME: 1,
  EMAIL: 2,
  PASSWORD: 3,
  CONFIRM_PASSWORD: 4,
  DATE_OF_BIRTH: 5,
  AGREED_TO_TOS: 6,
} as const; // 'as const' makes the values read-only and literal.

/**
 * Interface representing a single error message with its corresponding field index.
 * The `messages` field is now an array to support multiple errors per field.
 */
export interface ErrorMessage {
  // Correctly type the index to be one of the *values* in ErrorIndex.
  index: (typeof ErrorIndex)[keyof typeof ErrorIndex];
  message: string[];
}

/**
 * Creates and returns an initial error array with an empty message
 * for each field. This is useful for initializing state in your component.
 *
 * @returns An array of ErrorMessage objects.
 */
export function createInitialErrors(): ErrorMessage[] {
  const initialErrors = Object.keys(ErrorIndex).map((key) => {
    return {
      index: ErrorIndex[key as keyof typeof ErrorIndex],
      message: [],
    };
  });

  return initialErrors;
}

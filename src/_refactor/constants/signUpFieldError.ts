/**
 * contains data used both by:
 * - signUp
 * - signUpForm
 *
 * this is a workaround to avoid circular dependencies.
 */
export const FIELD_INDICES = {
  firstName: 0,
  lastName: 1,
  email: 2,
  password: 3,
  confirmPassword: 4,
  dateOfBirth: 5,
} as const;

export interface FieldError {
  id: number;
  message: string;
}

export type FieldIndexKey = keyof typeof FIELD_INDICES;

// // expo wouldn't stop complaining about a missing default function
// export default function ts() {
//   return;
// }

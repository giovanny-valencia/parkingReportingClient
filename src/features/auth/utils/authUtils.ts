import { UserDto } from "../dtos/Auth";

/**
 * Called by {@link useAuthStore} to clear Auth state.
 *
 * Checks if a user's token has expired.
 * The 'exp' field is a Unix timestamp in seconds.
 *
 * @param user The user DTO containing the expiration time.
 * @returns True if the token is expired, false otherwise.
 */
export function isTokenExpired(user: UserDto | null): boolean {
  if (!user || !user.exp) {
    return true;
  }

  const currentTime = Date.now();

  // milliseconds factor
  const expirationTime = user.exp * 1000;

  return currentTime > expirationTime;
}

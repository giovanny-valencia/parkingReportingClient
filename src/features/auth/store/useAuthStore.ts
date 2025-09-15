import { create } from "zustand";
import { UserDto, UserJwtPayload } from "../dtos/Auth";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { mapJwtPayloadToUserDto } from "../utils/authMapper";
import { isTokenExpired } from "../utils/authUtils";

/**
 * Interface representing the authentication state.
 * @property {string | null} token - The user Jwt token. Null if not authenticated.
 * @property {UserDto | null} user - Decoded Jwt user fields
 */
interface AuthState {
  token: string | null;
  user: UserDto | null;
}

interface AuthActions {
  checkIfSessionExpired: () => boolean;
  refreshAuth: () => Promise<void>;
}

/**
 * The Zustand store for managing authentication state.
 * @returns {AuthState & AuthActions} The combined state and actions.
 */
export const useAuthStore = create<AuthState & AuthActions>((set, get) => {
  const setAuth = (token: string, user: UserDto) =>
    set({ token: token, user: user });
  const clearAuth = () => set({ token: null, user: null });

  return {
    token: null,
    user: null,
    isLoading: true,

    checkIfSessionExpired: () => {
      const user = get().user;

      if (isTokenExpired(user)) {
        clearAuth();
        return true;
      }
      return false;
    },

    refreshAuth: async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userAuthToken");

        if (storedToken) {
          const decodedJwt = jwtDecode(storedToken) as UserJwtPayload;

          const user: UserDto = mapJwtPayloadToUserDto(decodedJwt);

          setAuth(storedToken, user);

          get().checkIfSessionExpired();
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Failed to load auth token:", error);
        clearAuth();
      }
    },
  };
});

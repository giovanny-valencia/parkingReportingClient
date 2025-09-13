import { create } from "zustand";
import { UserDto } from "../dtos/Auth";

/**
 * Interface representing the authentication state.
 * @property {string | null} token - The user's authentication token. Null if not authenticated.
 * @property {boolean} isLoading - A flag to indicate if authentication state is being loaded.
 */
interface AuthState {
  token: string | null;
  user: UserDto | null;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (token: string, user: UserDto) => void;
  clearAuth: () => void;
  setIsLoading: (loading: boolean) => void;
}

/**
 * The Zustand store for managing authentication state.
 * @returns {AuthState & AuthActions} The combined state and actions.
 */
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

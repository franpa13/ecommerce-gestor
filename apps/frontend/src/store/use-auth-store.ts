import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../interfaces/user-types";

interface AuthStore {
  user: User | null;
  token: string | null;
  loginUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      loginUser: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

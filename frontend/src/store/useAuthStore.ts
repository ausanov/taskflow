import { create } from "zustand";

interface AuthStore {
  authed: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authed: !!localStorage.getItem("token"),

  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ authed: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ authed: false });
  },
}));

import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    nickname: string;
    avatar: string | null;
  } | null;
  setAuth: (token: string, user: any) => void;
  // any 고치고 싶음
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAuth: (token, user) => set({ accessToken: token, user }),
  logout: () => set({ accessToken: null, user: null }),
}));

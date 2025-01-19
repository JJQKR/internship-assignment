import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (token, user) => set({ accessToken: token, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
    }
  )
);

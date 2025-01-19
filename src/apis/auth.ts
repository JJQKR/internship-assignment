import { LoginForm, LoginResponse, User } from "../types/authType";
import { useAuthStore } from "../stores/auth.store";
import { axiosInstance } from "./axios";
import { useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

//가입
export const registerApi = async (formData: FormData) => {
  const response = await axiosInstance.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response) {
    throw new Error("가입 뮤테이션 에러");
  }
  return response.data;
};

//로그인
export const loginApi = async (data: LoginForm) => {
  const response = await axiosInstance.post<LoginResponse>("/login", data);
  if (response.data.success) {
    localStorage.setItem("accessToken", response.data.accessToken);
    useAuthStore.getState().setAuth(response.data.accessToken, {
      id: response.data.userId,
      nickname: response.data.nickname,
      avatar: response.data.avatar,
    });
  }

  if (!response) {
    Sentry.captureException(Error);
    throw new Error("로그인 중 오류가 발생했습니다");
  }
  return response.data;
};

// 로그아웃

export const logoutApi = () => {
  const queryClient = useQueryClient();
  localStorage.removeItem("accessToken");
  useAuthStore.getState().logout();
  queryClient.removeQueries({ queryKey: ["user"] });
};

//조회
export const getUserApi = async () => {
  const response = await axiosInstance.get<User>("/user");
  const token = localStorage.getItem("accessToken");
  if (token) {
    useAuthStore.getState().setAuth(token, response.data);
  }

  if (!response) {
    throw new Error("사용저 정보 조회 오류 발생");
  }
  return response.data;
};

//수정
export const editUserApi = async (formData: FormData) => {
  const response = await axiosInstance.patch<User>("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const token = localStorage.getItem("accessToken");
  if (token) {
    useAuthStore.getState().setAuth(token, response.data);
  }

  if (!response) {
    throw new Error("프로필 수정 오류 발생");
  }
  return response.data;
};

//토큰 유효성 검증

export const validateToken = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;
  const response = await axiosInstance.get("/validate-token");
  if (!response) {
    throw new Error("토큰 유효성 검증 오류 발생");
  }
  return response.data.isValid;
};

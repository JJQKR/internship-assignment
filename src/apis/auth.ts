import axios from "axios";
import {
  LoginForm,
  LoginResponse,
  RegisterForm,
  User,
} from "../types/authType";

import { BASE_URL } from "../constants/base.url";
import { axiosInstance } from "./axios";

//가입
export const registerApi = async (
  data: Omit<RegisterForm, "passwordConfirm">
) => {
  const response = await axios.post("/register", data);
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
  }
  if (!response) {
    throw new Error("로그인 뮤테이션 에러");
  }
  return response.data;
};

//조회
export const getUserApi = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

//수정
export const editUserApi = async (data: Partial<User>) => {
  const response = await axiosInstance.patch("/profile", data), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return response.data;
};

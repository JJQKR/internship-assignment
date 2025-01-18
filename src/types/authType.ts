export interface RegisterForm {
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  avatar: null | File;
}

export interface LoginForm {
  id: string;
  password: string;
}

export interface User {
  id: string;
  nickname: string;
  password: string;
  avatar: null | File;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  avatar: string;
  nickname: string;
  success: boolean;
}

export interface EditForm {
  password: string;
  passwordConfirm: string;
  nickname: string;
  avatar: null | File;
}

export interface TestUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

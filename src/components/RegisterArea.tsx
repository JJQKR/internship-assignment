import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../types/authType";
import { useMutation } from "@tanstack/react-query";

import { registerApi } from "../apis/auth";

const RegisterArea = () => {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState<RegisterForm>({
    id: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    avatar: "",
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      alert("회원 가입에 성공했습니다!");
      navigate("/login");
    },
    onError: (error) => {
      alert(`${error}, 회원 가입 중 오류가 발생했습니다.`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newUserData.id.length < 5) {
      alert("ID는 최소 5자 이상이어야 합니다.");
      return;
    }

    if (newUserData.nickname.length < 2) {
      alert("닉네임은 최소 2자 이상이어야 합니다.");
      return;
    }

    if (newUserData.password !== newUserData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newUserData.password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    const { passwordConfirm, ...registerData } = newUserData;
    registerMutation.mutate(registerData);
  };

  return (
    <div>
      <form className="register-form mt-6 " onSubmit={handleSubmit}>
        <div className="rounded-sm shadow-sm space-y-4">
          <div>
            <label
              htmlFor="avatar"
              className="text-sm font-medium text-gray-700"
            >
              프로필 이미지
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              value={newUserData.avatar}
              onChange={(event) =>
                setNewUserData((prev) => ({
                  ...prev,
                  avatar: event.target.value,
                }))
              }
              placeholder="프로필 이미지를 업로드해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={newUserData.id}
              onChange={(event) =>
                setNewUserData((prev) => ({ ...prev, id: event.target.value }))
              }
              placeholder="5자 이상의 아이디를 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={newUserData.nickname}
              onChange={(event) =>
                setNewUserData((prev) => ({
                  ...prev,
                  nickname: event.target.value,
                }))
              }
              placeholder="2자 이상의 닉네임을 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={newUserData.password}
              onChange={(event) =>
                setNewUserData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              placeholder="6자 이상의 비밀번호를 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="text"
              onChange={(event) =>
                setNewUserData((prev) => ({
                  ...prev,
                  passwordConfirm: event.target.value,
                }))
              }
              placeholder="비밀번호를 재입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {registerMutation.isPending ? "처리 중입니다" : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterArea;

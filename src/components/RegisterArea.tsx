import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../types/registerTypes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const RegisterArea = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    id: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  // 이거 왜 필요?
  //  const [error, setError] = useState<string>('')

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        data
      );
      if (!response) {
        throw new Error("데이터 뮤테이션 실패");
      }
      return response.data;
    },
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

    if (formData.id.length < 5) {
      alert("ID는 최소 5자 이상이어야 합니다.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    const { passwordConfirm, ...registerData } = formData;
    registerMutation.mutate(registerData);
  };

  return (
    <div>
      <form className="register-form mt-6 space-7-6" onSubmit={handleSubmit}>
        <div className="rounded-sm shadow-sm space-y-4">
          <div>
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={formData.id}
              onChange={(event) => event.target.value}
              placeholder="아이디를 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
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
              value={formData.nickname}
              onChange={(event) => event.target.value}
              placeholder="닉네임을 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
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
              type="text"
              value={formData.password}
              onChange={(event) => event.target.value}
              placeholder="비밀번호를 입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
          </div>

          <div>
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="text"
              onChange={(event) => event.target.value}
              placeholder="비밀번호를 재입력해주세요"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {registerMutation.isPending ? "처리 중입니다" : "가입하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterArea;

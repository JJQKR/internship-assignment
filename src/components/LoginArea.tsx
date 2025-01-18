import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth";

const LoginArea = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      alert("로그인에 성공했습니다!");
      // 토큰 지정 로직 필요
      navigate("/");
    },
    onError: (error) => {
      alert(`${error}, 로그인 중 오류가 발생했습니다.`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(userData);
  };

  return (
    <div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-sm shadow-sm space-y-4">
          <div>
            <label htmlFor="id" className="text-sm font-medium text-gray-700">
              아이디
            </label>

            <input
              id="id"
              name="id"
              type="text"
              value={userData.id}
              onChange={(event) =>
                setUserData((prev) => ({ ...prev, id: event.target.value }))
              }
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              value={userData.password}
              onChange={(event) =>
                setUserData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {loginMutation.isPending ? "로그인 중입니다" : "로그인하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginArea;

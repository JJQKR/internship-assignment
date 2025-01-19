import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUserApi, getUserApi } from "../apis/auth";
import { EditForm } from "../types/authType";
import { useAuthStore } from "../stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";

const EditArea = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [editedUserData, setEditedUserData] = useState<EditForm>({
    nickname: "",
    password: "",
    passwordConfirm: "",
    avatar: null,
  });

  const { data: currentUserData } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  useEffect(() => {
    if (user) {
      setEditedUserData((prev) => ({
        ...prev,
        nickname: user.nickname,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (currentUserData) {
      setEditedUserData((prev) => ({
        ...prev,
        avatar: currentUserData.avatar,
        id: currentUserData.id,
        nickname: currentUserData.nickname,
      }));
    }
  }, [currentUserData]);

  const editMutation = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("회원정보 수정에 성공했습니다!");
      navigate("/");
    },
    onError: () => {
      alert("회원정보 수정에 실패했습니다.");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedUserData.password !== editedUserData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formData = new FormData();

    if (editedUserData.avatar) {
      formData.append("avatar", editedUserData.avatar);
    }

    if (editedUserData.nickname) {
      formData.append("nickname", editedUserData.nickname);
    }

    if (editedUserData.password) {
      formData.append("password", editedUserData.password);
    }

    editMutation.mutate(formData);
  };
  return (
    <div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-sm shadow-sm space-y-4">
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
              value={editedUserData.nickname}
              onChange={(event) =>
                setEditedUserData((prev) => ({
                  ...prev,
                  nickname: event.target.value,
                }))
              }
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              새 비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={editedUserData.password}
              onChange={(event) =>
                setEditedUserData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-700"
            >
              새 비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={editedUserData.passwordConfirm}
              onChange={(event) =>
                setEditedUserData((prev) => ({
                  ...prev,
                  passwordConfirm: event.target.value,
                }))
              }
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

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
              onChange={(event) => {
                if (event.target.files?.[0]) {
                  setEditedUserData((prev) => ({
                    ...prev,
                    avatar: event.target.files?.[0],
                  }));
                }
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={editMutation.isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {editMutation.isPending ? "수정 중입니다" : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArea;

import axios from "axios";
import { PLACEHOLDER_URL } from "../constants/placeholder.url";
import { TestUser } from "../types/authType";

//가입 테스트
export const testRegister = async (userData: {
  username: string;
  name: string;
}) => {
  const response = await axios.post<TestUser>(
    `${PLACEHOLDER_URL}/users`,
    userData
  );
  return response.data;
};

//조회 테스트
export const testGetUser = async (id: number) => {
  const response = await axios.get<TestUser>(`${PLACEHOLDER_URL}/users/${id}`);
  return response.data;
};

//수정 테스트
export const testUpdateUser = async (
  id: number,
  userData: Partial<TestUser>
) => {
  const response = await axios.put<TestUser>(
    `${PLACEHOLDER_URL}/users/${id}`,
    userData
  );
  return response.data;
};

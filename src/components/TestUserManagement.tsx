import { useMutation, useQuery } from "@tanstack/react-query";
import { testRegister, testGetUser, testUpdateUser } from "../apis/userTest";

const TestUserManagement = () => {
  // 특정 유저 정보 조회 (ID: 1)
  const { data: userData } = useQuery({
    queryKey: ["test-user", 1],
    queryFn: () => testGetUser(1),
  });

  // 회원가입 테스트
  const registerMutation = useMutation({
    mutationFn: testRegister,
    onSuccess: (data) => {
      console.log("가입 성공:", data);
      alert("테스트 회원가입 성공!");
    },
    onError: () => {
      alert("테스트 회원가입 실패");
    },
  });

  // 정보 수정 테스트
  const updateMutation = useMutation({
    mutationFn: (userData: { id: number; name: string }) =>
      testUpdateUser(userData.id, { name: userData.name }),
    onSuccess: (data) => {
      console.log("수정 성공:", data);
      alert("테스트 정보수정 성공!");
    },
  });

  // 테스트 회원가입
  const handleTestRegister = () => {
    registerMutation.mutate({
      username: "testuser",
      name: "테스트 유저",
    });
  };

  // 테스트 정보 수정
  const handleTestUpdate = () => {
    if (userData) {
      updateMutation.mutate({
        id: userData.id,
        name: "수정된 이름",
      });
    }
  };

  return (
    <div>
      <h2>JSONPlaceholder 테스트</h2>
      {/* 조회된 유저 정보 표시 */}
      {userData && (
        <div>
          <h3>현재 유저 정보</h3>
          <p>이름: {userData.name}</p>
          <p>아이디: {userData.username}</p>
        </div>
      )}

      {/* 테스트 버튼들 */}
      <div>
        <button onClick={handleTestRegister}>테스트 회원가입</button>
        <button onClick={handleTestUpdate}>테스트 정보수정</button>
      </div>
    </div>
  );
};

export default TestUserManagement;

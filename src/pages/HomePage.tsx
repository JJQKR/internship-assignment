import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { GrUserSettings } from "react-icons/gr";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <>
      <h1 className="text-purple-500 font-bold m-4 text-xl">
        강연주 한 달 인턴 온보딩 과제
      </h1>
      <div className="m-4 font-semibold text-lg">
        {user ? `${user.nickname}` : "게스트"}님 환영합니다
      </div>

      {!user ? (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="p-2 m-2 bg-indigo-400 text-white rounded-sm"
          >
            로그인
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleLogout}
            className="p-2 m-2 bg-indigo-400 text-white rounded-sm"
          >
            로그아웃
          </button>
        </div>
      )}

      <div>
        <button
          onClick={() => navigate("register")}
          className="p-2 m-2 bg-indigo-400 text-white rounded-sm"
        >
          회원 가입
        </button>
      </div>

      <button
        onClick={() => navigate("/edit")}
        className="p-2 m-2 bg-indigo-400 text-white rounded-sm"
      >
        <GrUserSettings />
      </button>
    </>
  );
};

export default HomePage;

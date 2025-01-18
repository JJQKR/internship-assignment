import React from "react";
import RegisterArea from "../components/RegisterArea";
import LoginArea from "../components/LoginArea";

const HomePage = () => {
  return (
    <>
      <h2 className="text-purple-500">강연주 한 달 인턴 온보딩 과제</h2>
      <div>❤️ 님 환영합니다</div>

      <div>
        <button>로그인</button>
      </div>
      <div>
        {" "}
        <button>로그아웃</button>
      </div>

      <div>
        <button>회원 가입</button>
      </div>
      <RegisterArea />
      <LoginArea />
    </>
  );
};

export default HomePage;

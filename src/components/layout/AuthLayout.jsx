import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../Navigation";

const AuthLayout = () => {

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert('로그인이 필요합니다')
      // 스탠다드 replace : history 제거 
      return <Navigate to='/login' replace />
    }
  }, [])

  return (
    <div>
      <h1>Auth Layout</h1>
      <p>반드시 로그인이 되어있어야 하는 페이지입니다.</p>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;

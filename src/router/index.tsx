import React, { useEffect, useRef, useState } from "react";
import App from "@/views/App";
import Login from "@/views/Login";
import Layout from "@/views/Layout";
import Profile from "@/views/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router";
import NProgress from "nprogress";
import { getUserInfo } from "@/request";

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard: React.FC<RouterGuardProps> = (props) => {
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const flag = useRef(true)

  const whiteList = ["/", "/login"];
  const location = useLocation();
  const token = localStorage.getItem("token");
  NProgress.start();
  useEffect(() => {
    (async () => {
      if (flag.current) {
        const res = await getUserInfo();
        if (res) {
          setHasUserInfo(true);
        }
      }
    })();
    flag.current = false
  }, []);
  if (token) {
    if (hasUserInfo) {
      if (location.pathname === "/login") {
        NProgress.done();
        return <Navigate to="/" />;
      }
      NProgress.done();
      return props.children;
    }
    return null;
  } else {
    if (whiteList.includes(location.pathname)) {
      NProgress.done();
      return props.children;
    } else {
      NProgress.done();
      return <Navigate to="/login" />;
    }
  }
};

const Router = () => {
  return (
    <BrowserRouter>
      <RouterGuard>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout />}>
            <Route path="/" element={<App />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </RouterGuard>
    </BrowserRouter>
  );
};

export default Router;

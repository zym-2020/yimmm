import React, { useEffect } from "react";
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
import { useAppSelector, useAppDispatch } from "@/hooks";
import { updateUserInfo } from "@/store/user";

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard: React.FC<RouterGuardProps> = (props) => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const whiteList = ["/", "/login"];
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (userInfo.hasUserFlag || !token) {
        return;
      }
      const res = await getUserInfo();
      if (res) {
        dispatch({
          type: updateUserInfo.type,
          payload: {
            name: res.data.name,
            acount: res.data.account,
            role: res.data.role,
          },
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  NProgress.start();
  if (token) {
    if (userInfo.hasUserFlag) {
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

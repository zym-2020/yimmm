import React from "react";
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

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard: React.FC<RouterGuardProps> = (props) => {
  const whiteList = ["/", "/login"];
  const location = useLocation();
  const token = localStorage.getItem("token");
  NProgress.start();
  if (token) {
    if (location.pathname === "/login") {
      return <Navigate to="/" />;
    }
    NProgress.done();
    return props.children;
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

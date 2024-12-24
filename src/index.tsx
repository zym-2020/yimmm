import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/views/App";
import Login from "@/views/Login";
import Layout from "@/views/Layout";
import Profile from "@/views/Profile";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.less";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/" element={<App />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

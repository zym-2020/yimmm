import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/router";
import { App } from "antd";
import MessageComponent from "@/utils/common";
import "./index.less";
import "nprogress/nprogress.css";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App>
      <Router />
      <MessageComponent />
    </App>
  </React.StrictMode>
);

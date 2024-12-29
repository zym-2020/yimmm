import { message } from "antd";
export const openMessage = (
  msg: string,
  type: "success" | "error" | "warning"
) => {
  message.open({
    content: msg,
    type: type,
  });
};

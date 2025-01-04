import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

const Fn = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};


export const openMessage = (
  msg: string,
  type: "success" | "error" | "warning"
) => {
  message.open({
    content: msg,
    type: type,
  });
};

export const openNotification = (msg: string) => {
  notification.open({
    message: msg,
  });
};

export const openModal = (
  msg: string,
  type: "confirm" | "error" | "info" | "warning" | "success"
) => {
  switch (type) {
    case "confirm":
      modal.confirm({
        content: msg,
      });
      return;
    case "error":
      modal.error({ content: msg });
      return;
    case "info":
      modal.info({ content: msg });
      return;
    case "warning":
      modal.warning({ content: msg });
      return;
    case "success":
      modal.success({ content: msg });
      return;
  }
};

export default Fn;

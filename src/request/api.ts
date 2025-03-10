import axios, { AxiosResponse } from "axios";
import { openMessage } from "@/utils/common";
import { IResponseType, EErrorCode } from "@/interface";

const axiosInstance = axios.create({
  baseURL: "/yimmm",
});

const requestList = new Set<String>();

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setTimeout(() => {
      requestList.delete(response.config.url + (response.config.data ?? ""));
    }, 500);
    switch (response.data.code) {
      case 0:
        return response.data;
      case EErrorCode.TOKEN_WRONG || EErrorCode.NO_TOKEN:
        openMessage(`${response.data.msg}`, "error");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return null;
      default:
        openMessage(`${response.data.msg}`, "error");
        return null;
    }
  },
  (err) => {
    if (axios.isCancel(err)) {
      openMessage("操作过于频繁", "warning");
      return null;
    } else {
      openMessage("请求错误", "error");
      requestList.delete(err.config.url + (err.config.data ?? ""));
      return null;
    }
  }
);

export const get = <T = null>(
  url: string,
  debounce = true,
  needToken = true
): Promise<IResponseType<T>> | null => {
  if (debounce) {
    if (requestList.has(url)) {
      openMessage("操作过于频繁", "warning");
      return null;
    } else {
      requestList.add(url);
    }
  }
  const token = localStorage.getItem("token") ?? "";
  if (needToken) {
    return axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axiosInstance.get(url);
  }
};

export const post = <T = null>(
  url: string,
  data?: any,
  debounce = true,
  needToken = true
): Promise<IResponseType<T>> | null => {
  if (debounce) {
    if (requestList.has(url + JSON.stringify(data))) {
      openMessage("操作过于频繁", "warning");
      return null;
    } else {
      requestList.add(url + JSON.stringify(data));
    }
  }
  const token = localStorage.getItem("token") ?? "";
  if (needToken) {
    return axiosInstance.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axiosInstance.post(url, data);
  }
};

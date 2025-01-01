import axios, { AxiosResponse } from "axios";
import { openMessage } from "@/utils/common";
import { IResponseType } from "@/interface";

const axiosInstance = axios.create({
  baseURL: "/yimmm",
});

const requestList = new Set<String>();

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setTimeout(() => {
      requestList.delete(response.config.url + response.config.data);
    }, 500);
    return response.data;
  },
  (err) => {
    if (axios.isCancel(err)) {
      openMessage("操作过于频繁", "warning");
      return null;
    } else {
      openMessage("请求错误", "error");
      requestList.delete(err.config.url + err.config.data);
      return err.data;
    }
  }
);

export const get = <T>(
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
    return axiosInstance.get(url)
  }
};

export const post = <T>(
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
    })
  } else {
    return axiosInstance.post(url, data)
  }
};

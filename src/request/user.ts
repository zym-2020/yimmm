import { get, post } from "./api";
import { IGetUserInfoRes, IRegisterFormReq } from "@/interface";

export const login = (account: string, password: string) => {
  return post<string>(
    "/login",
    {
      account,
      password,
    },
    true,
    false
  );
};

export const register = (reqBody: IRegisterFormReq) => {
  return post("/register", reqBody, true, false);
};

export const getUserInfo = () => {
  return get<IGetUserInfoRes>("/getUserInfo", false);
};

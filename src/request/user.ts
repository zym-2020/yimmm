import { get, post } from "./api";
import { IGetUserInfoRes } from '@/interface'

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

export const getUserInfo = () => {
  return get<IGetUserInfoRes>("/getUserInfo")
}
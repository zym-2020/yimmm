import { post } from "./api";

export const login = (account: string, password: string) => {
  return post<string>(
    "/login",
    {
      account,
      password,
    },
    true,
    true
  );
};

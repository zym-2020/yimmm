import { post } from "./api";

export const login = (account: string, password: string) => {
  return post("/login", {
    account,
    password,
  });
};

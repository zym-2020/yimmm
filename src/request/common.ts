import { get } from "./api";

export const getPublicKey = () => {
  return get<string>("/getPublicKey", true, false);
};

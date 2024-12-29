export const returnResponse = <T>(
  data: T,
  msg = ""
): { code: number; data: T; msg: string } => {
  return {
    code: 0,
    data,
    msg,
  };
};

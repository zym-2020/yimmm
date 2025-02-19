import { pool } from "@/utils/db";
import { IUser, IRegisterReq } from "@/interface";

export const queryUserByAccount = async (account: string) => {
  const res = await pool.query<IUser>(
    `select * from users where account = '${account}'`
  );
  return res;
};

export const addUser = async (user: IRegisterReq) => {
  const sqlScript = `insert into users values ('${user.account}', '${user.password}', '${user.name}', 0);`;
  await pool.query(sqlScript);
};

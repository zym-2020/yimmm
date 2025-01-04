import { pool } from "@/utils/db";
import { IUser } from '@/interface'

export const queryUserByAccount = async (account: string) => {
    const res = await pool.query<IUser>(`select * from users where account = '${account}'`)
    return res
}
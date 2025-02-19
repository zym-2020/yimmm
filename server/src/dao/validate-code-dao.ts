/**
 * @author        yimmm <1161384816@qq.com>
 * @date          2025-02-20 00:13:12
 * Copyright © YourCompanyName All rights reserved
 */
import { pool } from "@/utils/db";
import { IValidateCodePojo } from "@/interface";

export const addValidateCode = async (validateCode: IValidateCodePojo) => {
  const sqlScript = `insert into validate_code values ('${validateCode.account}', '${validateCode.code}', ${validateCode.time});`;
  await pool.query(sqlScript);
};

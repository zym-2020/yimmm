import { Pool } from "pg";
import config from "@/config/setting.json";

export const pool = new Pool({
  user: config.postgresql.user,
  host: config.postgresql.host,
  database: config.postgresql.database,
  password: config.postgresql.password,
  port: config.postgresql.port,
});

pool.connect((err) => {
  if (err) {
    console.error("连接到 PostgreSQL 失败", err);
  } else {
    console.log("成功连接到 PostgreSQL");
  }
});

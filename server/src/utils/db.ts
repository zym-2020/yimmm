import { Pool } from "pg";
import config from "@/config/setting.json";

export const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

pool.connect((err) => {
  if (err) {
    console.error("连接到 PostgreSQL 失败", err);
  } else {
    console.log("成功连接到 PostgreSQL");
  }
});

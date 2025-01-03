import express from "express";
import { returnResponse, generateToken } from "@/utils/common";
import { pool } from "@/utils/db";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  console.log("pool", pool)
  res.send(
    returnResponse(generateToken({ account: "yimmm", name: "yimmmzhang" }))
  );
});

export default router;

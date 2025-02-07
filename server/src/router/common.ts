import express from "express";
import path from "path";
import fs from "fs";
import { returnResponse } from "@/utils/common";

const router = express.Router();

router.get("/getPublicKey", (req, res) => {
  const filePath = path.resolve(__dirname, "../config/publicKey.pem");
  const publicKey = fs.readFileSync(filePath, "utf-8");
  res.send(returnResponse(publicKey));
});

export default router

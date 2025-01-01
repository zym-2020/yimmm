import express from "express";
import { returnResponse, generateToken } from "@/utils/common";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send(
    returnResponse(generateToken({ account: "yimmm", name: "yimmmzhang" }))
  );
});

export default router;

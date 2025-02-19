/**
 * @author        yimmm <1161384816@qq.com>
 * @date          2025-02-19 23:33:24
 * Copyright © YourCompanyName All rights reserved
 */
import nodemailer from "nodemailer";

// 创建一个 SMTP 传输对象
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // SMTP 服务器地址
  port: 465, // SMTP 端口（通常是 587 或 465）
  secure: true, // true 为 465，false 为其他端口
  auth: {
    user: "1161384816@qq.com", // 你的邮箱
    pass: "itjlyjfpgvqmihgi", // 你的邮箱密码
  },
});

export const generateValidateCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

export const sendValidateCode = (to: string, validateCode: string) => {
  
  const mailOptions = {
    from: "1161384816@qq.com", // 发件人
    to: to, // 收件人
    subject: "验证你的电子邮箱", // 邮件主题
    html: `<p>您好</p>
    <p>您正在注册pornhub社区</p>
    <p>您的验证码是<strong>${validateCode}</strong></p>
    <p>该验证码5分钟内有效</p>
    `,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) console.log(err);
  });
};

import { Form, Input, Button } from "antd";
import "./index.less";
import { useState } from "react";
import { IRegisterFormReq } from "@/interface";
import { register, getPublicKey } from "@/request";
import { encodeByRAS, encodeByMD5 } from "@/utils/forge";
// import { openMessage } from "@/utils/common";
import { useNavigate, Navigate } from "react-router";

const Register = () => {
  const userExists = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("user="));
  if (userExists) {
    return <Navigate to="/validateAccount" />;
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterFormReq>({
    account: "",
    password: "",
    name: "",
  });
  const [form] = Form.useForm();

  return (
    <Form
      className="register-form"
      labelAlign="right"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ account: "", password: "", name: "" }}
      form={form}
      onValuesChange={(changedValues: any, values: IRegisterFormReq) => {
        setFormData(values);
      }}>
      <Form.Item
        label="账号"
        name="account"
        rules={[
          { type: "email" },
          { required: true, message: "账号不得为空" },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "密码不得为空" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: true, message: "用户名不得为空" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
        }}>
        <Button
          block
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then(async () => {
                const publicKeyPem = await getPublicKey();
                if (publicKeyPem) {
                  const hash = encodeByMD5(formData.password);
                  const encodePassword = encodeByRAS(publicKeyPem.data, hash);
                  const res = await register({
                    ...formData,
                    password: encodePassword,
                  });
                  if (res) {
                    // openMessage("注册成功", "success");
                    navigate("/validateAccount");
                  }
                }
              })
              .catch(() => {});
          }}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;

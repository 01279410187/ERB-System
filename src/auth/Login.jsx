import React from "react";
import { login } from "../apis/auth";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const res = await login(values);
    if (!(res instanceof Error)) {
      values.remember
        ? localStorage.setItem("token", res.data.data.token)
        : sessionStorage.setItem("token", res.data.data.token);
    } else {
      message.error(res.response.data.error.message);
    }
    navigate("/warehouse");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="إسم المستخدم"
        name="username"
        rules={[
          {
            required: true,
            message: "من فضلك أدخل إسم المستخدم",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="كلمة المرور"
        name="password"
        rules={[
          {
            required: true,
            message: "من فضلك أدخل كلمة المرور",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>تذكرنى</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          تسجيل الدخول
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;

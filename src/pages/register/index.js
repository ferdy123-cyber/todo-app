import { Button, Form, Input, message, Space } from "antd/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function Login() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const onFinish = async (values) => {
    try {
      setloading(true);
      await axios.post("/api/user/register", values);
      setloading(false);
      router.push("/login");
      message.success("register success");
    } catch (err) {
      console.log(err);
      message.error(err?.response?.data?.message ?? "error service");
      setloading(false);
    }
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: 500,
            padding: 30,
            borderRadius: 10,
          }}
        >
          <Form
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Re-Password"
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Please input re-password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button loading={loading} type="primary" htmlType="submit">
                  Register
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

import React, { useState} from "react";

import { Form, Input, Button, message, Flex, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

const AddUser = () => {
  const [complete, setComplete] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setComplete(false);
    await axios.post("https://pf-todo-api.vercel.app/adduser", {
      values,
    });
    form.resetFields();
    setComplete(true);
  };
  const Complete = (props) => {
    return (
      <div className="my-3">
        <div className="text-xs text-green-500 font-bold">
          You added an user.
        </div>
      </div>
    );
  };

  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-center font-bold text-2xl mb-8">
          Add An User
        </div>

        <Form
          form={form}
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Enter a name,surname" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Name"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </Form.Item>
          <Form.Item
            name="eMail"
            rules={[{ required: true, message: "Enter an e-mail" }]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-500" />}
              placeholder="E-Mail"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              type="email"

            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Enter an username" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Username"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter a password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-500" />}
              placeholder="Password"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Add An User
            </Button>
          </Form.Item>
        </Form>
        {complete ? <Complete /> : <div></div>}
      </Card>
    </Flex>
  );
};

export default AddUser;

import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../Context/AuthContext";
import { Oval } from "react-loader-spinner";

import { Form, Input, Button, message, Flex, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorField, SetErrorField] = useState("");
  const isAuthenticated = localStorage.getItem("auth-token");
  const { userData, setLoggedIn, getLoggedIn, setUserData } =
    useContext(AuthContext);

  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      let userResponse = await axios.post("https://pf-todo-api.vercel.app/Login", {
        values,
      });
      localStorage.setItem("auth-token", userResponse.data.token);
      setUserData({
        token: userResponse.data.token,
        user: userResponse.data.user,
      });
      setLoggedIn(true);
      history.push("/yourtodo");
    } catch (error) {
      setLoading(false);

      SetErrorField(error.response.data.hata);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/yourtodo");
    }
  }, [isAuthenticated,history]);
  const Error = (props) => {
    const message = props.ErrorType;
    return (
      <div className="my-3">
        <div className="text-xs text-red-500 font-bold">{message}</div>
      </div>
    );
  };
  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-center font-bold text-2xl mb-8">
          Login
        </div>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
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
          <Error ErrorType={errorField} />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              {loading ? (
                <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <div>Login</div>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;

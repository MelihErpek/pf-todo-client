import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Oval } from "react-loader-spinner";

import { Form, Input, Button, message, Flex, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddToDoItem = () => {
  const { userData } = useContext(AuthContext);
  const [image, setbaseImage] = useState();
  const [ownerID, setID] = useState();
  const [complete, setComplete] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = localStorage.getItem("auth-token");
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);

    await axios.post("https://pf-todo-api.vercel.app/additem", {
      values,
      image,
      ownerID,
    });
    form.resetFields();
    setLoading(false);

    setComplete(true);
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setbaseImage(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    if (userData.user !== undefined) {
      setID(userData.user.user._id);
    }
  }, [userData]);
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated,history]);
  const Complete = (props) => {
    return (
      <div className="my-3">
        <div className="text-xs text-green-500 font-bold">
          You added a ToDo item.
        </div>
      </div>
    );
  };
  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-center font-bold text-2xl mb-8">
          Add ToDo Item
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
            name="headline"
            rules={[{ required: true, message: "Enter a title" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Title"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Enter a description" }]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-500" />}
              placeholder="Description"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full"
            />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Select an image" }]}
          >
            <div className="flex items-center justify-center">
              <label className="cursor-pointer  items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-md border border-dotted border-blue-400 hover:bg-blue-50 transition duration-300">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => uploadImage(e)}
                />
              </label>
            </div>
          </Form.Item>

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
                <div>Add ToDo Item</div>
              )}
            </Button>
          </Form.Item>
        </Form>
        {complete ? <Complete /> : <div></div>}
      </Card>
    </Flex>
  );
};

export default AddToDoItem;

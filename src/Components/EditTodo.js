import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Flex, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined,CheckCircleOutlined } from "@ant-design/icons";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditTodo(props) {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("auth-token");

  const [headline1, setHeadline] = useState();
  const [description, setDescription] = useState();
  const onFinish = async (values) => {
    let id = props.match.params.id;
    setLoading(true);
    await axios.post("https://pf-todo-api.vercel.app/edittodo", {
      values,
      id,
    });
    setLoading(false);
    setComplete(true);
  };
  useEffect(() => {
    let id = props.match.params.id;
    axios
      .post("https://pf-todo-api.vercel.app/findtodo", {
        id,
      })
      .then((json) => {
        console.log(json.data.headline);
        setHeadline(json.data.headline);
        setDescription(json.data.description);
      });
  }, []);
  useEffect(() => {
      if (!isAuthenticated) {
        history.push("/login");
      }
    }, [isAuthenticated,history]);
  const Complete = (props) => {
    return (
      <div className="my-3">
        <div className="text-xs text-green-500 font-bold">
          You edited a ToDo item.
        </div>
      </div>
    );
  };
  return (
    <div>
      {headline1 ? (
        <div>
          <Flex
            align="center"
            justify="center"
            className="min-h-screen bg-gray-100"
          >
            <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
              <div className="flex justify-center font-bold text-2xl mb-8">
                Edit A ToDo
              </div>

              <Form
                name="login_form"
                initialValues={{
                  remember: true,
                  headline: headline1,
                  description,
                }}
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  name="headline"
                  rules={[
                    { required: true, message: "Lütfen headline girin!" },
                  ]}
                >
                  <Input
                    prefix={<CheckCircleOutlined className="text-gray-500" />}
                    placeholder="Headline"
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Lütfen description girin!" },
                  ]}
                >
                  <Input
                    prefix={<CheckCircleOutlined className="text-gray-500" />}
                    placeholder="Description"
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                  />
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
                      <div>Edit</div>
                    )}
                  </Button>
                  {complete ? <Complete /> : <div></div>}
                </Form.Item>
              </Form>
            </Card>
          </Flex>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

import { Button, Form, Input, Modal } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import withConnect from "../../connect";
import { LOGIN_URL } from "../../path";
const Login = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (props.role) {
      router.push("/");
    }
  });
  const { dispatch } = props;
  const cookies = new Cookies();
  const onSubmit = async (values) => {
    let res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let maxAge = 15 * 60 * 1000;
    try {
      let data = await res.json();
      const user = { type: "SET_USER", payload: data };
      dispatch(user);
      cookies.set("userid", data.id, {
        maxAge,
      });
      console.log("USER", data);
      router.push("/");
    } catch (err) {
      Modal.error({ content: "Đăng nhập sai, vui lòng kiểm tra lại" });
    }
  };
  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        style={{ fontSize: "1.6rem" }}
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        style={{ fontSize: "1.6rem" }}
        type="password"
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
        size="large"
      >
        <Input.Password style={{ fontSize: "1.6rem" }} placeholder="Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default withConnect(
  (state) => ({ ...state.authReducer }),
  (dispatch) => {
    return { dispatch };
  }
)(Login);

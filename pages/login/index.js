import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import withConnect from "../../connect";
import Cookies from "universal-cookie";
import { LOGIN_URL } from "../../path";
import "antd/dist/antd.css";
const Login = (props) => {
  const { dispatch } = props;
  const cookies = new Cookies();
  const router = useRouter();
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
      router.push("/");
    } catch (err) {
      router.push("/login");
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
  () => ({}),
  (dispatch) => {
    return { dispatch };
  }
)(Login);

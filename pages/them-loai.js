import Layout from "../components/Layout";
import withConnect from "../connect";
import { Form, Input, Button } from "antd";

import { ADD_CATEGORY_URL } from "../path";
const Page = (props) => {
  /*
  name, shortDescription, price, description, category : {id, code}, picture (options)
  */

  const handleSubmit = async (values) => {
    let req = await fetch(ADD_CATEGORY_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let res = await req.json();
    console.log("RESPONSE : ", res);
  };
  return (
    <Layout>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên loại đồng hồ :"
          rules={[
            { message: "Tên loại đồng hồ không được bỏ trống", required: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Code:"
          rules={[{ message: "Mã không được bỏ trống", required: true }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>
    </Layout>
  );
};

export default withConnect((state) => ({ ...state.authReducer }))(Page);

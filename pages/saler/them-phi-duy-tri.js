import Layout from "../../components/Layout";
import withConnect from "../../connect";
import { Form, Input, Button, Modal } from "antd";

import { ADD_MAINTAINFEE_URL } from "../../path";
const { TextArea } = Input;

const Page = (props) => {
  const { id } = props;
  /*
    fee, note, account
  */
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    values.account = { id };
    try {
      let req = await fetch(ADD_MAINTAINFEE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      let res = await req.json();
      if (res.id) {
        form.resetFields();
        Modal.success({ content: "Thêm thành công" });
      }
    } catch (err) {
      Modal.error({ content: "Thêm thất bại. Vui lòng thử lại." });
    }
  };
  return (
    <Layout>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="note"
          label="Chú thích :"
          rules={[{ message: "Chú thích không được bỏ trống", required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Chi phí:"
          rules={[{ message: "Chi phí không được bỏ trống", required: true }]}
        >
          <Input type="number" step={500} min={500} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>
    </Layout>
  );
};

export default withConnect((state) => ({ ...state.authReducer }))(Page);

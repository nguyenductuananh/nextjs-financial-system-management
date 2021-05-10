import Layout from "../components/Layout";
import withConnect from "../connect";
import { Form, Input, Button, Select, Modal } from "antd";
const { TextArea } = Input;
const { Option } = Select;
import { CATEGORY_URL, ADD_ITEM_URL } from "../path";
const Page = (props) => {
  /*
  name, shortDescription, price, description, category : {id, code}, picture (options)
  */
  const { categories, username } = props;
  const mapCategoryCodeToObject = (id) => {
    let cate = [...categories].find((c) => {
      return c.id === id;
    });
    return cate;
  };
  const handleSubmit = async (values) => {
    try {
      let postObject = {
        ...values,
        category: mapCategoryCodeToObject(values.category),
        shortDescription: values.description.slice(0, 200),
      };
      let req = await fetch(ADD_ITEM_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObject),
      });
      let res = await req.json();
      Modal.success({ content: "Thêm thành công" });
    } catch (err) {
      Modal.error({ content: "Thêm thất bại. Vui lòng thử lại." });
    }
  };
  return (
    <Layout>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên đồng hồ :"
          rules={[
            { message: "Tên đồng hồ không được bỏ trống", required: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô Tả :"
          rules={[{ message: "Mô tả không được bỏ trống", required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá :"
          rules={[{ message: "Giá không được bỏ trống", required: true }]}
        >
          <Input type="number" step={500} min={1000} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Loại đồng hồ :"
          rules={[
            { message: "Loại đồng hồ không được bỏ trống", required: true },
          ]}
        >
          <Select>
            {categories.map((cate) => (
              <Option key={cate.id} value={cate.id}>
                <span>{cate.name}</span>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>
    </Layout>
  );
};

export default withConnect((state) => ({ ...state.authReducer }))(Page);

export const getStaticProps = async () => {
  let res = await fetch(CATEGORY_URL);
  let data = await res.json();

  return {
    props: {
      categories: data,
    },
  };
};

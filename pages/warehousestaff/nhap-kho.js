import { Form, Input, Button, DatePicker, Table } from "antd";
import Layout from "../../components/Layout";
import withConnect from "../../connect";
import "antd/dist/antd.css";
import { ITEM_URL } from "../../path";
const Page = (props) => {
  const { username, id, items } = props;
  const columns = [
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Tên", dataIndex: "name" },
    { title: "Đơn giá", dataIndex: "price" },
    { title: "Số lượng", dataIndex: "quantity" },
  ];
  let quantities = [];
  const handleChangeQuantity = (form) => {
    let number = parseInt(form.target.value);
    let id = form.target.id;
    let index = quantities.findIndex((quantity) => quantity.id === id);
    if (index === -1) {
      quantities.push({ id, quantity: number });
    } else {
      if (number) quantities[index].quantity = number;
      else {
        quantities = [
          ...quantities.splice(0, index),
          ...quantities.splice(index + 1),
        ];
      }
    }
  };
  const data = [...items].map((item) => {
    let quantity = (
      <Input
        type="number"
        name="quantity"
        id={1}
        step={1}
        onChange={(values) => {
          handleChangeQuantity(values);
        }}
      />
    );
    return { ...item, key: item.id, quantity };
  });

  const onFinish = (values) => {
    if (selectedProducts) {
      selectedProducts = selectedProducts.map((e) => {
        let q = quantities.find((q) => q.id === e.id);
        if (!q || !q.quantity) {
          alert(
            `Bạn cần kiểm tra các trường số lượng của ID : ${e.id}` +
              ".\nHoặc giá trị mặc định là 1"
          );
          return { ...e, quantity: 1 };
        } else {
          return { ...e, quantity: q.quantity };
        }
      });
      values.items = selectedProducts;
    }
    console.log(values);
  };
  let selectedProducts = [];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows) {
        selectedProducts = [...selectedRows];
      }
    },
  };
  return (
    <Layout>
      <Form layout="vertical" labelCol={{ span: 3 }} onFinish={onFinish}>
        <Form.Item label="Nhân viên : ">
          <Input value={username} readOnly />
        </Form.Item>

        <Table
          scroll={{ x: 300, y: 200 }}
          name="selectedProduct"
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
        />
        <Form.Item
          label="Nhà cung cấp"
          name="suplier"
          rules={[
            { message: "Nhà cung cấp không được bỏ trống", required: true },
          ]}
        >
          <Input list="supliers" />
        </Form.Item>
        <datalist id="supliers">
          <option value="ABC">Nguyen Duc Tuan Anh</option>
        </datalist>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
export default withConnect((state) => ({ ...state.authReducer }))(Page);

export const getStaticProps = async () => {
  let res = await fetch(ITEM_URL);
  let items = await res.json();

  return {
    props: { items },
  };
};

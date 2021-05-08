import { Form, Input, Button, DatePicker, Table } from "antd";
import Layout from "../../../components/Layout";
import withConnect from "../../../connect";
import { ITEM_URL } from "../../../path";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
const Page = (props) => {
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { username, id, items } = props;
  const columns = [
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Tên", dataIndex: "name" },
    { title: "Đơn giá", dataIndex: "price" },
    { title: "Số lượng", dataIndex: "quantity" },
  ];
  const handleChangeQuantity = (form) => {
    let number = parseInt(form.target.value);
    let id = form.target.id;
    let newQuantities = [...quantities];
    let index = newQuantities.findIndex((quantity) => quantity.id === id);
    if (index === -1) {
      newQuantities.push({ id, quantity: number });
    } else {
      if (!isNaN(number)) {
        quantities[index].quantity = number;
      } else {
        newQuantities = [
          ...newQuantities.splice(0, index),
          ...newQuantities.splice(index + 1),
        ];
      }
    }
    let newSelectedProducts = [...selectedProducts];
    if (newSelectedProducts.length !== 0) {
      let i = newSelectedProducts.findIndex((s) => {
        return s.id === id;
      });
      if (i !== -1) newSelectedProducts[i].quantity = number;
    }
    setSelectedProducts(newSelectedProducts);
    setQuantities(newQuantities);
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
    if (total === 0) {
      alert("Bạn cần chọn ít nhất một mặt hàng.");
      return;
    }
    values.items = selectedProducts;
    console.log(values);
  };
  useEffect(() => {
    let newTotal = selectedProducts.reduce(
      (a, b) => a + b.quantity * b.price,
      0
    );
    setTotal(newTotal);
  }, [selectedProducts]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let newSelectedProducts;
      if (selectedRows) {
        newSelectedProducts = [...selectedRows].map((s) => {
          let qu = [...quantities].find((q) => {
            return q.id === s.id;
          });
          if (qu) {
            return { ...s, quantity: qu.quantity };
          } else {
            return { ...s, quantity: 1 };
          }
        });
      }
      let newTotal = [...newSelectedProducts].reduce(
        (a, b) => a + b.quantity * b.price,
        0
      );
      setSelectedProducts(newSelectedProducts);
    },
  };

  return (
    <Layout>
      <Form layout="vertical" labelCol={{ span: 3 }} onFinish={onFinish}>
        <Form.Item label="Nhân viên : ">
          <Input value={username} readOnly />
        </Form.Item>
        <Form.Item
          name="time"
          label="Thời gian"
          rules={[{ required: true, message: "Thời gian không được bỏ trống" }]}
        >
          <DatePicker value={new Date().toDateString()} />
        </Form.Item>
        <Table
          onChange={(form) => {
            console.log("FORM", form);
          }}
          name="selectedProduct"
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
        />
        <Form.Item
          label="Tên khách hàng"
          name="customerName"
          rules={[
            { message: "Tên khách hàng không được bỏ trống", required: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { message: "Số điện thoại không được bỏ trống", required: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tổng tiền :">
          <Input value={total} readOnly />
        </Form.Item>
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

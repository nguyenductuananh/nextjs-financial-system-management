import { Form, Input, Button, Table, Modal } from "antd";
import Layout from "../../components/Layout";
import withConnect from "../../connect";
import "antd/dist/antd.css";
import {
  ITEM_URL,
  GET_SUPPLIERS_URL,
  ADD_PRODUCT_WAREHOUSE_URL,
} from "../../path";
import { useState, useEffect } from "react";
const Page = (props) => {
  const [form] = Form.useForm();
  const { username, id, items, suppliers } = props;
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [priceImports, setPriceImports] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [total, setTotal] = useState(0);
  const columns = [
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Tên", dataIndex: "name" },
    { title: "Đơn giá \n (default : 1000)", dataIndex: "priceImport" },
    { title: "Số lượng \n (default : 1)", dataIndex: "quantity" },
  ];
  const handleSupplierChangeName = (e) => {
    let text = e.target.value;
    let index = [...suppliers].findIndex((s) => {
      return s.name === text;
    });
    if (index >= 0) {
      form.setFieldsValue({
        address: suppliers[index].address,
        phoneNumber: suppliers[index].phoneNumber,
        email: suppliers[index].email,
        index,
      });
    } else {
      form.setFieldsValue({
        address: "",
        phoneNumber: "",
        email: "",
        index: -1,
      });
    }
  };
  const handleChangeQuantity = (form) => {
    let number = parseInt(form.target.value);
    if (number < 1) return;
    let id = parseInt(form.target.id);
    let newQuantities = [...quantities];
    let index = newQuantities.findIndex((quantity) => quantity.id === id);
    if (index === -1) {
      newQuantities.push({ id, quantity: number });
    } else {
      if (number) {
        newQuantities[index].quantity = number;
      } else {
        newQuantities = [...newQuantities.splice(index - 1, 1)];
      }
    }
    let newSelectedProducts = [...selectedProducts];
    if (newSelectedProducts.length !== 0) {
      let i = newSelectedProducts.findIndex((s) => {
        return s.id === id;
      });
      if (i !== -1) {
        if (index === -1) newSelectedProducts[i].quantity = 1;
        else {
          if (number)
            newSelectedProducts[i].quantity = newQuantities[index].quantity;
          else newSelectedProducts[i].quantity = 1;
        }
      }
    }
    setQuantities(newQuantities);
    setSelectedProducts(newSelectedProducts);
  };
  const handleChangePriceImport = (e) => {
    let number = parseInt(e.target.value) || 1000;
    let id = parseInt(e.target.id);
    let newPriceImport = [...priceImports];
    let index = newPriceImport.findIndex((i) => {
      return i.id === id;
    });
    if (index === -1) {
      newPriceImport.push({ id, priceImport: number });
    } else {
      newPriceImport[index].priceImport = number;
    }
    setPriceImports(newPriceImport);
    let newSelectedProducts = [...selectedProducts];
    let spIndex = newSelectedProducts.findIndex((i) => i.id === id);
    if (spIndex !== -1) {
      newSelectedProducts[spIndex].priceImport = number;
      setSelectedProducts(newSelectedProducts);
    }
  };
  const data = [...items].map((item) => {
    let quantity = (
      <Input
        type="number"
        name="quantity"
        id={item.id}
        step={1}
        onChange={(values) => {
          handleChangeQuantity(values);
        }}
      />
    );
    let priceImport = (
      <Input
        type="number"
        name="quantity"
        id={item.id}
        step={500}
        onChange={(values) => {
          handleChangePriceImport(values);
        }}
      />
    );
    return { ...item, priceImport, key: item.id, quantity };
  });

  const onFinish = async (values) => {
    const supplier = values.index
      ? suppliers[values.index]
      : {
          name: values.name,
          address: values.address,
          phoneNumber: values.phoneNumber,
          email: values.email,
        };
    const importItem = selectedProducts.map((item) => {
      return {
        item: { ...item },
        quantity: item.quantity,
        priceImport: item.priceImport,
      };
    });
    const account = {
      id,
    };
    let req = await fetch(ADD_PRODUCT_WAREHOUSE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ supplier, importItem, account }),
    });
    let res = await req.json();

    if (res.id) {
      Modal.success({ content: "Thêm thành công" });
    } else {
      Modal.error({ content: "Thêm thất bại!!. Thử lại" });
    }
  };
  useEffect(() => {
    let newTotal = selectedProducts.reduce(
      (a, b) => a + b.quantity * b.priceImport,
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
          let imp = [...priceImports].findIndex((imp) => {
            return imp.id === s.id;
          });
          if (qu) {
            if (imp === -1) {
              return { ...s, quantity: qu.quantity };
            } else {
              return {
                ...s,
                quantity: qu.quantity,
                priceImport: priceImports[imp].priceImport,
              };
            }
          } else {
            return { ...s, quantity: 1 };
          }
        });
      }
      setSelectedProducts(newSelectedProducts);
    },
  };
  return (
    <Layout>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 3 }}
        onFinish={onFinish}
        initialValues={{ index: -1 }}
      >
        <Form.Item label="Nhân viên : ">
          <Input value={username} readOnly />
        </Form.Item>
        <Form.Item name="index">
          <Input type="hidden" readOnly />
        </Form.Item>
        <Table
          scroll={{ x: 300, y: 200 }}
          name="selectedProduct"
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
        />
        <Form.Item label="Total">
          <Input value={total} readOnly />
        </Form.Item>
        <Form.Item
          label="Nhà cung cấp"
          name="name"
          rules={[
            { message: "Nhà cung cấp không được bỏ trống", required: true },
          ]}
        >
          <Input
            list="suppliers"
            onChange={(e) => {
              handleSupplierChangeName(e);
            }}
          />
        </Form.Item>
        <datalist id="suppliers">
          {suppliers.map((sup) => {
            return (
              <option key={sup.id} value={sup.name}>
                {sup.name}
              </option>
            );
          })}
        </datalist>
        <Form.Item
          name="address"
          rules={[{ message: "Địa chỉ không được bỏ trống", required: true }]}
          label="Địa chỉ : "
        >
          <Input
            value={selectedSupplier.address ? selectedSupplier.address : ""}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { message: "Số điện thoại không được bỏ trống", required: true },
          ]}
          label="Số điện thoại : "
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ message: "Email không được bỏ trống", required: true }]}
          label="Email: "
        >
          <Input />
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
  let res2 = await fetch(GET_SUPPLIERS_URL);
  let suppliers = await res2.json();
  return {
    props: { items, suppliers },
  };
};

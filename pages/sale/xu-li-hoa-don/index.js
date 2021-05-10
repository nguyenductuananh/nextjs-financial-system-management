import { Form, Input, Button, Modal, Table, Select } from "antd";
const { Option } = Select;
import Layout from "../../../components/Layout";
import withConnect from "../../../connect";
import {
  ITEM_URL,
  SEARCH_CUSTOMER_URL,
  ADD_ORDER_URL,
  CITY_API_URL,
  DISTRICT_API_URL,
  WARD_API_URL,
} from "../../../path";
import "antd/dist/antd.css";
import { useEffect, useRef, useState } from "react";
const Page = (props) => {
  const [address, setAddress] = useState({
    city: {},
    district: {},
    ward: {},
  });
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { username, items, cities } = props;
  const [districts, setDistricts] = useState([]);
  const [wards, setWard] = useState([]);
  const columns = [
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Tên", dataIndex: "name" },
    { title: "Đơn giá", dataIndex: "price" },
    { title: "Số lượng", dataIndex: "quantity" },
  ];
  const userRef = useRef();
  userRef.current = {};
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
  const data = [...items].map((item) => {
    let quantity = (
      <Input
        type="number"
        name="quantity"
        id={1}
        step={1}
        min={1}
        onChange={(values) => {
          handleChangeQuantity(values);
        }}
      />
    );
    return { ...item, key: item.id, quantity };
  });
  const onFinish = async (values) => {
    if (total === 0) {
      alert("Bạn cần chọn ít nhất một mặt hàng.");
      return;
    }

    values.items = selectedProducts;
    values.fullName = convertFullName(values.fullName);
    let itemOrderList = values.items.map((item) => {
      return {
        item: { ...item },
        quantity: item.quantity,
        price: item.price,
      };
    });
    let postObject = {
      customer: {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
      },
      account: {
        id: 1,
      },
      itemOrderList,
    };
    console.log(postObject);
    let req = await fetch(ADD_ORDER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObject),
    });
    let res = await req.json();
    if (res.id) {
      Modal.success({ content: "Thêm thành công.!" });
    } else {
      Modal.error({ content: "Thêm thất bại. Xin thử lại." });
    }
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

      setSelectedProducts(newSelectedProducts);
    },
  };
  const fetchData = async () => {
    if (address.district.ID) {
      let URL = WARD_API_URL(address.district.ID);
      let res = await fetch(URL);
      let data = await res.json();
      setWard(data);
      return;
    }
    if (address.city.ID) {
      let URL = DISTRICT_API_URL(address.city.ID);
      let res = await fetch(URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://thongtindoanhnghiep.co/",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      let data = await res.json();
      setDistricts(data);
      return;
    }
  };
  useEffect(() => {
    fetchData();
  }, [address]);
  const handleSelectChange = (code, type) => {
    console.log(address);
    switch (type) {
      case "city": {
        let newCity = { ID: cities[code].ID, Title: cities[code].Title };
        setAddress({ city: newCity, district: {}, ward: {} });
        break;
      }
      case "district": {
        let newDistrict = { ID: cities[code].ID, Title: cities[code].Title };
        setAddress({ ...address, district: newDistrict, ward: {} });
        break;
      }
    }
  };
  const searchCustomerByPhoneNumber = async (e) => {
    let phoneNumber = e.target.value;
    if (!phoneNumber || phoneNumber.length < 10) return;
    let postObject = { phoneNumber };
    let req = await fetch(SEARCH_CUSTOMER_URL, {
      method: "POST",
      headers: {
        mode: "no-cors",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObject),
    });
    let res = await req.json();
    if (!res.status) {
      alert("Thông tin khách hàng đã tồn tại. Hệ thống tự điền thông tin");
      userRef.current = { ...res };
    }
  };
  const convertFullName = (obj) => {
    if (typeof obj === "string") {
      let nameSplited = obj.split(" ");
      let result = [];
      for (let e of nameSplited) {
        if (e.trim()) {
          let str = e.trim().toLowerCase();
          result.push(str.slice(0, 1).toUpperCase() + str.slice(1));
        }
      }
      return {
        firstName: result[0],
        lastName: result[result.length - 1],
        midName: result.slice(1, result.length - 1).join(" "),
      };
    } else {
      return Object.values(obj).join(" ");
    }
  };
  return (
    <Layout>
      <Form layout="vertical" labelCol={{ span: 3 }} onFinish={onFinish}>
        <Form.Item label="Nhân viên : ">
          <Input value={username} readOnly />
        </Form.Item>
        <Table
          name="selectedProduct"
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
        />
        <Form.Item
          label="Tên khách hàng"
          name="fullName"
          rules={[
            { message: "Tên khách hàng không được bỏ trống", required: true },
          ]}
        >
          <Input
            value={
              userRef.current.phoneNumber
                ? () => {
                    convertFullName(userRef.current.fullName);
                  }
                : ""
            }
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { message: "Số điện thoại không được bỏ trống", required: true },
          ]}
        >
          <Input
            maxLength={10}
            onChange={(e) => {
              searchCustomerByPhoneNumber(e);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ message: "Email không được bỏ trống", required: true }]}
        >
          <Input
            value={userRef.current.phoneNumber ? userRef.current.email : ""}
          />
        </Form.Item>
        <Form.Item
          label="Thành phố/Tỉnh"
          name="city"
          rules={[{ message: "Thành phố không được bỏ trống", required: true }]}
        >
          <Select
            name="city"
            onSelect={(value) => handleSelectChange(value, "city")}
          >
            {cities.map((city, index) => {
              return (
                <Option key={index} value={index}>
                  {city.Title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Huyện"
          name="district"
          rules={[{ message: "Huyện không được bỏ trống", required: true }]}
        >
          <Select
            name="district"
            disabled={!address.city.ID}
            onSelect={(value) => handleSelectChange(value, "district")}
          >
            {districts &&
              districts.map((city) => {
                return (
                  <Option key={city.ID} value={city.ID}>
                    {city.Title}
                  </Option>
                );
              })}
          </Select>
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
  let res2 = await fetch(CITY_API_URL);
  let cities = await res2.json();
  cities = cities.LtsItem;
  return {
    props: { items, cities },
  };
};

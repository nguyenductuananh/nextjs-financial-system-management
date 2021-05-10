import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import Layout from "../../components/Layout";
import {
  GET_STOCK_OUT_URL,
  FILTER_STOCK_OUT_URL,
  GET_ORDERED_ITEMS_URL,
  FILTER_ORDERED_ITEMS_URL,
} from "../../path";
const Page = () => {
  const [totalChi, setTotalChi] = useState(0);
  const [totalThu, setTotalThu] = useState(0);
  const [dataListThu, setDataListThu] = useState([]);
  const [dataListChi, setDataListChi] = useState([]);
  //ten mat hang, Thoi gian ban, so luong, don gia, tong tien,
  const columns = [
    { title: "Tên đồng hồ", dataIndex: "name" },
    { title: "Thời gian", dataIndex: "time" },
    { title: "Số lượng", dataIndex: "quantity" },
    { title: "Đơn giá", dataIndex: "price" },
    { title: "Tổng tiền", dataIndex: "total" },
  ];
  const columnsChi = [
    { title: "Tên đồng hồ", dataIndex: "name" },
    { title: "Thời gian", dataIndex: "time" },
    { title: "Số lượng", dataIndex: "quantity" },
    { title: "Đơn giá", dataIndex: "priceImport" },
    { title: "Tổng tiền", dataIndex: "total" },
  ];
  const [filterObject, setFilterObject] = useState({});
  const formatDataToTableThu = (data) => {
    let totalLine = 0;

    let result = data.map((item) => {
      totalLine += item.quantity * item.price;
      return {
        key: item.id,
        time: new Date(item.createdDate).toDateString(),
        name: item.item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      };
    });
    setTotalThu(totalLine);
    return result;
  };
  const formatDataToTableChi = (data) => {
    let totalLine = 0;

    let result = data.map((item) => {
      totalLine += item.quantity * item.priceImport;
      return {
        key: item.id,
        time: new Date(item.createdDate).toDateString(),
        name: item.item.name,
        quantity: item.quantity,
        priceImport: item.priceImport,
        total: item.quantity * item.priceImport,
      };
    });
    setTotalChi(totalLine);
    return result;
  };
  const onSubmit = (values) => {
    let newFilter = {};
    if (values.date[0]) {
      newFilter.startDate = values.date[0].toDate().toLocaleDateString();
      newFilter.endDate = values.date[1].toDate().toLocaleDateString();
    }
    setFilterObject(newFilter);
  };
  //Thu
  useEffect(() => {
    if (Object.keys(filterObject) === 0) {
      fetchAll();
    } else {
      fetchFilter();
    }
  }, [filterObject]);
  const fetchFilter = () => {
    (async () => {
      let res = await fetch(FILTER_ORDERED_ITEMS_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterObject),
      });
      let data = await res.json();
      let newData = formatDataToTableThu(data);
      setDataListThu(newData);
    })();
    (async () => {
      let res = await fetch(FILTER_STOCK_OUT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterObject),
      });
      let data = await res.json();
      let newData = formatDataToTableChi(data);
      setDataListChi(newData);
    })();
  };
  const fetchAll = () => {
    (async () => {
      let res = await fetch(GET_ORDERED_ITEMS_URL);
      let data = await res.json();
      let newData = formatDataToTableThu(data);
      setDataListThu(newData);
    })();
    (async () => {
      let res = await fetch(GET_STOCK_OUT_URL);
      let data = await res.json();
      let newData = formatDataToTableChi(data);
      setDataListChi(newData);
    })();
  };
  function separateNumber(num) {
    let nfObject = new Intl.NumberFormat("en-US");
    let output = nfObject.format(num);
    return output;
  }
  return (
    <Layout>
      <Form onFinish={onSubmit}>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="date"
            label="Lọc"
            rules={[{ message: "Ngày không hợp lệ!", required: true }]}
          >
            <RangePicker />
          </Form.Item>
          <Button
            style={{ marginLeft: "20px" }}
            type="primary"
            htmlType="submit"
          >
            Lọc
          </Button>
        </div>
        <div style={{ display: "flex", minHeight: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Table
              scroll={{ y: 300 }}
              columns={columns}
              style={{ minHeight: "300px" }}
              dataSource={dataListThu}
            />
            <h1 style={{ textAlign: "center" }}>
              Thu (vnd) : {separateNumber(totalThu)}
            </h1>
          </div>
          <div>
            <Table
              style={{ minHeight: "300px" }}
              scroll={{ y: 300 }}
              columns={columnsChi}
              dataSource={dataListChi}
            />
            <h1 style={{ textAlign: "center" }}>
              Chi (vnd) : {separateNumber(totalChi)}
            </h1>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1>Doanh Thu (vnd) : </h1>

          <h1>{separateNumber(totalThu - totalChi)}</h1>
        </div>
      </Form>
    </Layout>
  );
};

export default Page;

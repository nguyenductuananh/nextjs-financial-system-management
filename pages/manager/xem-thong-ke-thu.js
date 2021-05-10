import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import Layout from "../../components/Layout";
import { GET_ORDERED_ITEMS_URL, FILTER_ORDERED_ITEMS_URL } from "../../path";
const Page = () => {
  //ten mat hang, Thoi gian ban, so luong, don gia, tong tien,
  const columns = [
    { title: "Tên đồng hồ", dataIndex: "name" },
    { title: "Thời gian bán", dataIndex: "time" },
    { title: "Số lượng", dataIndex: "quantity" },
    { title: "Đơn giá", dataIndex: "price" },
    { title: "Tổng tiền", dataIndex: "total" },
  ];
  let [totalFee, setTotalFee] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const onSubmit = (values) => {
    let newFilter = {
      startDate: values.date[0].toDate().toLocaleDateString(),
      endDate: values.date[1].toDate().toLocaleDateString(),
    };
    setFilterObject(newFilter);
  };
  const formatDataToTable = (data) => {
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
    setTotalFee(totalLine);
    return result;
  };
  function separateNumber(num) {
    let nfObject = new Intl.NumberFormat("en-US");
    let output = nfObject.format(num);
    return output;
  }
  useEffect(() => {
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
      let newData = formatDataToTable(data);
      setDataList(newData);
    })();
  }, [filterObject]);
  useEffect(() => {
    (async () => {
      let res = await fetch(GET_ORDERED_ITEMS_URL);
      let data = await res.json();
      let newData = formatDataToTable(data);
      setDataList(newData);
    })();
  }, []);
  return (
    <Layout>
      <Form onFinish={onSubmit}>
        <div style={{ display: "flex" }}>
          <Form.Item name="date" label="Lọc">
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
        <Table scroll={{ y: 240 }} columns={columns} dataSource={dataList} />
        <h2>Tổng thu (vnd) : {separateNumber(totalFee)}.</h2>
      </Form>
    </Layout>
  );
};

export default Page;

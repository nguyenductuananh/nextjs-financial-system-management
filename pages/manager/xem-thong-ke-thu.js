import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import Layout from "../../components/Layout";
import { GET_LIST_ORDER_URL } from "../../path";
const Page = () => {
  //ten mat hang, Thoi gian ban, so luong, don gia, tong tien,
  const columns = [
    { title: "Tên đồng hồ" },
    { title: "Thời gian bán" },
    { title: "Số lượng" },
    { title: "Đơn giá" },
    { title: "Tổng tiền" },
  ];
  const [dataList, setDataList] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const onSubmit = (values) => {
    let newFilter = {
      startDate: values.date[0].toDate().toISOString(),
      endDate: values.date[1].toDate().toISOString(),
    };
    setFilterObject(newFilter);
  };
  useEffect(() => {
    (async () => {
      let res = await fetch(GET_LIST_ORDER_URL);
      let data = await res.json();
      setDataList(data);
    })();
  }, [filterObject]);
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
        <Table columns={columns} dataSource={dataList} />
      </Form>
    </Layout>
  );
};

export default Page;

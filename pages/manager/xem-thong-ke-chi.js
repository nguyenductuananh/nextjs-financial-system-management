import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import Layout from "../../components/Layout";

const Page = () => {
  //ten mat hang, Thoi gian ban, so luong, don gia, tong tien,
  const columns = [
    { title: "Tên đồng hồ" },
    { title: "Thời gian bán" },
    { title: "Số lượng" },
    { title: "Đơn giá" },
    { title: "Tổng tiền" },
  ];
  const [filterObject, setFilterObject] = useState({});
  const onSubmit = (values) => {
    let newFilter = {
      startDate: values.date[0].toDate().toISOString(),
      endDate: values.date[1].toDate().toISOString(),
    };
    setFilterObject(newFilter);
  };
  useEffect(() => {
    (async () => {})();
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
        <Table columns={columns} />
      </Form>
    </Layout>
  );
};

export default Page;

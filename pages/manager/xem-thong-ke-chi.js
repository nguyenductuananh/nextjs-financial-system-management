import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import withConnect from "../../connect";
import { GET_STOCK_OUT_URL, FILTER_STOCK_OUT_URL } from "../../path";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
const Page = (props) => {
  const [totalFee, setTotalFee] = useState(0);

  //ten mat hang, Thoi gian ban, so luong, don gia, tong tien,
  const columns = [
    { title: "Tên đồng hồ", dataIndex: "name" },
    { title: "Thời gian nhập", dataIndex: "time" },
    { title: "Số lượng", dataIndex: "quantity" },
    { title: "Đơn giá", dataIndex: "priceImport" },
    { title: "Tổng tiền", dataIndex: "total" },
  ];
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
    let newData = data.map((item) => {
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
    setTotalFee(totalLine);
    return newData;
  };
  useEffect(() => {
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
      let newData = formatDataToTable(data);
      setDataList(newData);
    })();
  }, [filterObject]);
  useEffect(() => {
    (async () => {
      let res = await fetch(GET_STOCK_OUT_URL);
      let data = await res.json();
      let newData = formatDataToTable(data);
      setDataList(newData);
    })();
  }, []);
  function separateNumber(num) {
    let nfObject = new Intl.NumberFormat("en-US");
    let output = nfObject.format(num);
    return output;
  }
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
      </Form>
      <h2>Tổng chi (vnd) : {separateNumber(totalFee)}</h2>
    </Layout>
  );
};
export const getInitialProps = (props) => {
  console.log(props);
};
export default Page;

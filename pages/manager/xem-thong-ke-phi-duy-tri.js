import { Table, Form, DatePicker, Button } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
import Layout from "../../components/Layout";
import { GET_MAINTAINFEES_URL, FILTER_MAINTAINFEE_URL } from "../../path";
const Page = (props) => {
  const { maintainfees } = props;
  const [dataList, setDataList] = useState([]);
  const columns = [
    { title: "STT", dataIndex: "index" },
    { title: "Chi phí", dataIndex: "fee" },
    { title: "Note", dataIndex: "note" },
  ];
  const [filterObject, setFilterObject] = useState({});
  const onSubmit = (values) => {
    let newFilter = {
      startDate: values.date[0].toDate().toLocaleDateString(),
      endDate: values.date[1].toDate().toLocaleDateString(),
    };
    setFilterObject(newFilter);
  };
  const convertDataToTableData = (data) => {
    return data.map((m, index) => {
      return {
        ...m,
        index: `#${index + 1}`,
      };
    });
  };
  useEffect(() => {
    (async () => {
      let url =
        Object.keys(filterObject).length === 0
          ? GET_MAINTAINFEES_URL
          : FILTER_MAINTAINFEE_URL;

      let res = await fetch(
        url,
        Object.keys(filterObject).length === 0
          ? {}
          : {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(filterObject),
            }
      );
      let data = await res.json();
      setDataList(convertDataToTableData(data));
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

export const getStaticProps = async () => {
  let res = await fetch(GET_MAINTAINFEES_URL);
  let data = await res.json();
  return {
    props: {
      maintainfees: data,
    },
  };
};

import Link from "next/link";
import withConnect from "../../../connect";
import "antd/dist/antd.css";
import { Card } from "antd";
const UserCard = (props) => {
  const { username, role } = props;
  return (
    <Card
      title={`TK : ${username}`}
      extra={
        <Link href="/logout">
          <a>Đăng xuất</a>
        </Link>
      }
    >
      <p>{`Vị trí : ${role.name.toUpperCase()}`}</p>
    </Card>
  );
};
export default withConnect((state) => ({ ...state.authReducer }))(UserCard);

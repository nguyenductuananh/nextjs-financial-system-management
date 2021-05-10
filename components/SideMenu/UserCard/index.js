import Link from "next/link";
import withConnect from "../../../connect";
import "antd/dist/antd.css";
import { Card } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
const UserCard = (props) => {
  const { username, role } = props;
  const router = useRouter();
  useEffect(() => {
    if (!username) {
      router.push("/login");
    }
  }, []);
  return (
    <Card
      title={`TK : ${username}`}
      extra={
        <Link href="/logout">
          <a>Đăng xuất</a>
        </Link>
      }
    >
      <p>{`Vị trí : ${role ? role.name.toUpperCase() : ""}`}</p>
    </Card>
  );
};
export default withConnect((state) => ({ ...state.authReducer }))(UserCard);

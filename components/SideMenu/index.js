import { Menu } from "antd";
import UserCard from "./UserCard";
import "antd/dist/antd.css";
import Link from "next/link";
import withConnect from "../../connect";
import { getFunction } from "../../consts/Role.function";

const SideMenu = (props) => {
  const { role, username } = props;
  const lists = getFunction(role);

  return (
    <div style={{ minHeight: "100vh" }}>
      <UserCard />
      <Menu>
        {lists.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Link href={item.href}>
                <a>{item.title}</a>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};
const mapStateToProps = (state) => ({
  ...state.authReducer,
});
export default withConnect(mapStateToProps)(SideMenu);

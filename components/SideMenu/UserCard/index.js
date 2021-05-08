import Link from "next/link";
import withConnect from "../../../connect";
import styles from "./UserCard.module.css";
const UserCard = (props) => {
  const { username, role } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.username_wrapper}>
        <p className={styles.username}>{`Tài khoản : ${username}`}</p>
        <Link href="/logout">
          <a className={styles.link}>Đăng xuất</a>
        </Link>
      </div>
      <div>
        <p className={styles.role}>{`Vị trí : ${role.name}`}</p>
      </div>
    </div>
  );
};
export default withConnect((state) => ({ ...state.authReducer }))(UserCard);

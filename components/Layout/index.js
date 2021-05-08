import styles from "./layout.module.css";
import SideMenu from "../SideMenu";

const Layout = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.side_menu}>
        <SideMenu />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Layout;

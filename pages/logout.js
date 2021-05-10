import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Page = (props) => {
  const router = useRouter();
  const { dispatch } = props;
  useEffect(() => {
    dispatch({ type: "RESET_USER" });
    router.push("/login");
  }, []);
  return <></>;
};
const mapStateToProps = (state) => {
  return { ...state.authReducer };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);

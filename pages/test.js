import Layout from "../components/Layout";
import withConnect from "../connect";
const Page = (props) => {
  const { dispatch } = props;

  return (
    <Layout>
      <button
        onClick={() => {
          dispatch({
            type: "SET_USER",
            payload: { username: "CHANGED NAME", role: { name: "MANAGER" } },
          });
        }}
      >
        Change
      </button>
    </Layout>
  );
};
export default withConnect((state) => {
  return (
    { ...state.authReducer },
    (dispatch) => {
      return { dispatch };
    }
  );
})(Page);

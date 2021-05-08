import { connect } from "react-redux";
const withConnect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default withConnect;

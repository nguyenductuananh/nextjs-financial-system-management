const initState = {};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USER": {
      return { ...state };
    }
    case "SET_USER": {
      return { ...action.payload };
    }
    case "RESET_USER": {
      return {};
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;

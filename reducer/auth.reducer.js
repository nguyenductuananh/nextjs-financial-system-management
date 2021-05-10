const initState = {
  username: "Nguyen Duc Tuan Anh",
  role: {
    name: "admin",
  },
};
const authReducer = (state = initState, action) => {
  console.log("AUTHREDUCER ACTION :", action);
  switch (action.type) {
    case "GET_USER": {
      return { ...state };
    }
    case "SET_USER": {
      return { ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;

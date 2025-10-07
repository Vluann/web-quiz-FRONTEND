const loginAdmin = (state = false, action) => {
  switch (action.type) {
    case "CHECK_LOGIN_ADMIN":
      return action.status;

    default:
      return state;
  }
};
export default loginAdmin;

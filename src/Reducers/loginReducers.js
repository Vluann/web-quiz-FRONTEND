const LoginReducers = (state = false, action) => {
    switch (action.type) {

        case "STATUS_LOGIN":
            return action.status;

        default:
            return state;
    }
}
export default LoginReducers;
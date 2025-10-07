import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivatesAdmin() {
    const isLogin = useSelector((state) => state.loginAdmin);

    return (<>{isLogin ? <Outlet /> : <Navigate to="/login-admin" />}</>);
}

export default PrivatesAdmin;

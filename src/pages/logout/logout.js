import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { deleteAllCookies } from "../../helper/cookies";
import { updateStatusLogin } from "../../actions/login";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        messageApi.success({
            type: "success",
            content: "Đăng Xuất Thành Công!!!",
        });

        setTimeout(() => {
            deleteAllCookies();
            dispatch(updateStatusLogin(false));
            navigate("/login");
        }, 1500)

    }, [])
    return (
        <>
            {contextHolder}

        </>
    )
}

export default Logout;
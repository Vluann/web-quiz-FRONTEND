import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.scss";
import {  register } from "../../services/registerServices";
import { message } from "antd";
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target.elements[0].value;
        const email = e.target.elements[1].value;
        const password = e.target.elements[2].value;
        const password1 = e.target.elements[3].value;

        if (password1 !== password) {
            return messageApi.error("Vui lòng xác nhận lại đúng mật khẩu!");
        }

        const options = { fullName, email, password };

        const res = await register(options); 
        console.log(res);

        if (res.type === "EMAIL_EXISTED") {
            messageApi.error("Email đã tồn tại, vui lòng chọn email khác!");
        }
        else if (res.type === "REGISTER_SUCCESS") {
            messageApi.success("Đăng ký thành công!");
            setTimeout(() => navigate("/login"), 1500);
        }
        else {
            messageApi.error(res.message || "Có lỗi xảy ra, thử lại sau!");
        }
    };
    return (
        <>
            {contextHolder}
            <div className="register">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="register-item">
                            <h1>🎯 Quiz System</h1>
                            <p>Đăng Kí Tài Khoản</p>
                            <label className="register-item__label">Tên Đăng Nhập</label>
                            <div className="register-name">
                                <input type="text" placeholder="Nhập Vào Tên Đăng Nhập Của Bạn" />
                            </div>
                            <label className="register__label">Email</label>
                            <div className="register-email">
                                <input type="email" placeholder="Nhập Vào Email Của Bạn" />
                            </div>
                            <label className="register-item__label">Mật khẩu</label>
                            <div className="register-password">
                                <input type="password" placeholder="Nhập Vào Mật Khẩu Của Bạn" />
                            </div>

                            <label className="register-item__label">Nhập Lại Mật khẩu</label>
                            <div className="register-password">
                                <input type="password" placeholder="Nhập Lại Mật Khẩu Của Bạn" />
                            </div>

                            <button className="register-item__button">Đăng Kí</button>

                            <div className="register-login">
                                <p>Bạn Đã Có Tài Khoản? <Link to="/login">Đăng Nhập Ngay</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
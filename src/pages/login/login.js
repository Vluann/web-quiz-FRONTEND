import "bootstrap/dist/css/bootstrap.min.css";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginCheck } from "../../services/loginServices";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { updateStatusLogin } from "../../actions/login";
import { setCookie, deleteCookie } from "../../helper/cookies";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    deleteCookie("admin_email");
    deleteCookie("admin_fullName");
    deleteCookie("admin_id");
    deleteCookie("admin_phoneNumber");
    deleteCookie("admin_token");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    const checkLogin = await loginCheck(email, password);
    if (checkLogin?.success) {
      const time = 1;

      setCookie("email", checkLogin.users.email, time);
      setCookie("fullname", checkLogin.users.fullName, time);
      setCookie("token", checkLogin.users.token, time);
      setCookie("id", checkLogin.users.id, time);

      messageApi.success({ type: "success", content: "Đăng Nhập Thành Công!!!" });

      setTimeout(() => {
        dispatch(updateStatusLogin(true));
        navigate("/dashboard");
      }, 2000);
    } else {
      messageApi.error({ type: "error", content: "Sai email hoặc mật khẩu!" });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="login-item">
              <h1>🎯 Quiz System</h1>
              <p>Đăng nhập vào tài khoản của bạn</p>

              <label className="login-item__label">Email</label>
              <div className="login-email">
                <input type="email" placeholder="Nhập Vào Email Của Bạn" required />
              </div>

              <label className="login-item__label">Mật khẩu</label>
              <div className="login-password">
                <input type="password" placeholder="Nhập Vào Mật Khẩu Của Bạn" required />
              </div>

              <button className="login-item__button">Đăng Nhập</button>

              <div className="login-register">
                <p>
                  Chưa Có Tài Khoản? <Link to="/register">Đăng Kí Ngay</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

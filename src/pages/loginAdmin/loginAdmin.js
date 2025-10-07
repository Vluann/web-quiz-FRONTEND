import { message } from "antd";
import { checkUserAdmin } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAdminLogin } from "../../actions/loginAdmin";
import { setCookie, deleteCookie } from "../../helper/cookies";
import { useEffect } from "react";

function LoginAdmin() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteCookie("email");
    deleteCookie("fullname");
    deleteCookie("fullName");
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("phoneNumber");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    const response = await checkUserAdmin(email, password);
    if (response) {
      const time = 1;

      setCookie("admin_email", response.users.email, time);
      setCookie("admin_fullName", response.users.fullName, time);
      setCookie("admin_id", response.users.id, time);
      setCookie("admin_phoneNumber", response.users.phoneNumber, time);
      setCookie("admin_token", response.users.token, time);

      messageApi.success({ type: "success", content: "Đăng Nhập Thành Công!!!" });

      setTimeout(() => {
        dispatch(checkAdminLogin(true));
        navigate("/admin");
      }, 1500);
    } else {
      messageApi.error({ type: "error", content: "Tài Khoản Hoặc Mật Khẩu Không Chính Xác!!!!" });
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
              <p>Đăng nhập vào tài khoản quản trị</p>

              <label className="login-item__label">Email</label>
              <div className="login-email">
                <input type="email" placeholder="Nhập Vào Email Của Bạn" required />
              </div>

              <label className="login-item__label">Mật khẩu</label>
              <div className="login-password">
                <input type="password" placeholder="Nhập Vào Mật Khẩu Của Bạn" required />
              </div>

              <button className="login-item__button">Đăng Nhập</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;

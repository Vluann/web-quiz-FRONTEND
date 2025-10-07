import { message } from "antd";
import { useState } from "react";
import { getCookie, setCookie } from "../../helper/cookies";
import { updatePasswordAdmin, updateProfileAdmin } from "../../services/adminServices";

function AccountAdmin() {
  const idUser = getCookie("admin_id");
  const [fullname, setFullname] = useState(getCookie("admin_fullName") || "");
  const [email, setEmail] = useState(getCookie("admin_email") || "");
  const [phone, setPhone] = useState(getCookie("admin_phoneNumber") || "");
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const obj = { fullName: fullname, email, phone: phone || null };
    const response = await updateProfileAdmin(idUser, obj);
    if (response?.status) {
      setFullname(response.data.fullName);
      setEmail(response.data.email);
      setPhone(response.data.phoneNumber);

      setCookie("admin_fullName", response.data.fullName, 7);
      setCookie("admin_email", response.data.email, 7);
      setCookie("admin_phoneNumber", response.data.phoneNumber || "", 7);

      messageApi.success("Thay đổi dữ liệu thành công");
    } else {
      messageApi.error(response?.message || "Cập nhật thất bại");
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const passwordOld = e.target.elements[0].value;
    const passwordNew = e.target.elements[1].value;
    const passwordNewAgain = e.target.elements[2].value;

    const obj = { passwordOld, passwordNew, passwordNewAgain };
    const response = await updatePasswordAdmin(idUser, obj);
    if (response?.status) {
      messageApi.success("Đổi mật khẩu thành công");
      e.target.reset();
    } else {
      messageApi.error(response?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="accounts" style={{ padding: "16px" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Info */}
          <div className="accounts-section" style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              className="accounts-avatar"
              style={{
                width: 80,
                height: 80,
                lineHeight: "80px",
                borderRadius: "50%",
                backgroundColor: "#1677ff",
                color: "#fff",
                fontSize: 32,
                margin: "0 auto",
              }}
            >
              {fullname.charAt(0)}
            </div>
            <div className="accounts-fullname" style={{ fontSize: 20, fontWeight: 600, marginTop: 8 }}>
              {fullname}
            </div>
            <div className="accounts-email" style={{ color: "#555" }}>
              {email}
            </div>
            <div className="accounts-phone" style={{ color: "#555" }}>
              {phone || "Chưa có số điện thoại"}
            </div>
          </div>

          <div className="accounts-setting">
            <div className="row" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div className="col-left" style={{ flex: "1 1 300px", minWidth: 300 }}>
                <div className="accounts-inerleft" style={{ padding: 16, border: "1px solid #f0f0f0", borderRadius: 8 }}>
                  <form onSubmit={handleUpdateProfile}>
                    <h2 style={{ marginBottom: 16 }}>📝 Thông tin cá nhân</h2>

                    <label>Tên đăng nhập</label>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      style={{ width: "100%", padding: 8, marginBottom: 12 }}
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "100%", padding: 8, marginBottom: 12 }}
                    />

                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="Không bắt buộc"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: "100%", padding: 8, marginBottom: 16 }}
                    />

                    <button
                      type="submit"
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#1677ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Cập Nhật Thông Tin
                    </button>
                  </form>
                </div>
              </div>

              {/* Right: Password */}
              <div className="col-right" style={{ flex: "1 1 300px", minWidth: 300 }}>
                <div className="accounts-inerright" style={{ padding: 16, border: "1px solid #f0f0f0", borderRadius: 8 }}>
                  <form onSubmit={handleSubmitPassword}>
                    <h2 style={{ marginBottom: 16 }}>🔒 Đổi mật khẩu</h2>

                    <label>Mật khẩu hiện tại</label>
                    <input type="password" style={{ width: "100%", padding: 8, marginBottom: 12 }} />

                    <label>Mật khẩu mới</label>
                    <input type="password" style={{ width: "100%", padding: 8, marginBottom: 12 }} />

                    <label>Xác nhận mật khẩu mới</label>
                    <input type="password" style={{ width: "100%", padding: 8, marginBottom: 16 }} />

                    <button
                      type="submit"
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#1677ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Cập Nhật Mật Khẩu
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountAdmin;

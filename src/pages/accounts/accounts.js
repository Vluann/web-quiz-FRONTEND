import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../helper/cookies";
import "./accounts.scss";
import { getAnswerById } from "../../services/answerServices";
import { updateUser1, updateUser2 } from "../../services/userServices";
import { message } from "antd";

function Accounts() {
    const idUser = getCookie("id");

    // ✅ State thống kê quiz
    const [quizCount, setQuizCount] = useState(0);     
    const [examCount, setExamCount] = useState(0);     
    const [totalAvg, setTotalAvg] = useState(0);       
    const [totalCorrect, setTotalCorrect] = useState(0);

    const [fullname, setFullname] = useState(getCookie("fullname") || "");
    const [email, setEmail] = useState(getCookie("email") || "");
    const [phone, setPhone] = useState(getCookie("phone") || "");
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchApi = async () => {
            const answers = await getAnswerById(idUser);

            if (answers?.responseData?.results?.length > 0) {
                const results = answers.responseData.results;

                setQuizCount(results.length);
                setExamCount(results.length);

                const avg =
                    results.reduce((sum, item) => sum + item.avgScore, 0) /
                    results.length;
                setTotalAvg(avg.toFixed(2));

                const correct = results.reduce(
                    (sum, item) => sum + item.totalCorrect,
                    0
                );
                setTotalCorrect(correct);
            } else {
                setQuizCount(0);
                setExamCount(0);
                setTotalAvg(0);
                setTotalCorrect(0);
            }
        };
        fetchApi();
    }, [idUser]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const obj = {
            fullName: fullname,
            email,
            phone: phone || null,
        };

        const response = await updateUser1(idUser, obj);
        if (response?.status) {
            setFullname(response.data.fullName);
            setEmail(response.data.email);
            setPhone(response.data.phoneNumber);

            // Update cookie
            setCookie("fullname", response.data.fullName, 7);
            setCookie("email", response.data.email, 7);
            setCookie("phone", response.data.phoneNumber || "", 7);

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

        const response = await updateUser2(idUser, obj);
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
            <div className="accounts">
                <div className="container">
                    <div className="row">
                        {/* Info */}
                        <div className="col-12">
                            <div className="accounts-section">
                                <div className="accounts-avatar">{fullname.charAt(0)}</div>
                                <div className="accounts-fullname">{fullname}</div>
                                <div className="accounts-email">{email}</div>
                                <div className="accounts-phone">
                                    {phone || "Chưa có số điện thoại"}
                                </div>

                                <div className="accounts-menu">
                                    <div className="accounts-menu__item">
                                        <span className="span1">{quizCount}</span>
                                        <span className="span2">Quiz đã làm</span>
                                    </div>
                                    <div className="accounts-menu__item">
                                        <span className="span1">{examCount}</span>
                                        <span className="span2">Lượt thi</span>
                                    </div>
                                    <div className="accounts-menu__item">
                                        <span className="span1">{totalAvg}%</span>
                                        <span className="span2">Điểm TB</span>
                                    </div>
                                    <div className="accounts-menu__item">
                                        <span className="span1">{totalCorrect}</span>
                                        <span className="span2">Tổng điểm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="accounts-setting">
                        <div className="row">
                            {/* Left: Profile */}
                            <div className="col-6">
                                <div className="accounts-inerleft">
                                    <form onSubmit={handleUpdateProfile}>
                                        <h2>📝 Thông tin cá nhân</h2>
                                        <div className="accounts-inerleft__border"></div>

                                        <label>Tên đăng nhập</label>
                                        <div className="accounts-inerleft__fullname">
                                            <input
                                                type="text"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                            />
                                        </div>

                                        <label>Email</label>
                                        <div className="accounts-inerleft__fullname">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <label>Số điện thoại</label>
                                        <div className="accounts-inerleft__fullname">
                                            <input
                                                type="text"
                                                placeholder="Không bắt buộc"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit">Cập Nhật Thông Tin</button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="accounts-inerright">
                                    <form onSubmit={handleSubmitPassword}>
                                        <h2>🔒 Đổi mật khẩu</h2>
                                        <label>Mật khẩu hiện tại</label>
                                        <div className="accounts-inerleft__border"></div>
                                        <div className="accounts-inerleft__fullname">
                                            <input type="password" />
                                        </div>

                                        <label>Mật khẩu mới</label>
                                        <div className="accounts-inerleft__fullname">
                                            <input type="password" />
                                        </div>

                                        <label>Xác nhận mật khẩu mới</label>
                                        <div className="accounts-inerleft__fullname">
                                            <input type="password" />
                                        </div>

                                        <button>Cập Nhật Mật Khẩu</button>
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

export default Accounts;

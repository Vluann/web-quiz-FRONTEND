import "./header.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
    const isLogin = useSelector(state => state.LoginReducers);
    return (
        <>
            <div className="header">
                <div className="header-logo">
                    <h1>🎯 Quiz System</h1>
                </div>

                <div className="header-menu">
                    <ul>
                        {isLogin ? (<>
                            <button><li><NavLink to="/logout">Đăng Xuất</NavLink></li></button>
                           <button><li><NavLink to="/dashboard">DashBoard</NavLink></li></button>
                        </>) : (<>
                            <button><li><NavLink to="/login">Đăng Nhập</NavLink></li></button>
                            <button><li><NavLink to="/register">Đăng Kí</NavLink></li></button>
                        </>)}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Header
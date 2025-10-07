import { NavLink, useLocation } from "react-router-dom";
import "./header.scss";

function Header() {
  const location = useLocation();

  if (
    location.pathname.startsWith("/quiz") ||
    location.pathname.startsWith("/result-item")
  ) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-logo">
        <h1>🎯 Quiz System</h1>
      </div>

      <nav className="header-menu">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              DashBoard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myresults"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Kết Quả Của Tôi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ranking"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Bảng Xếp Hạng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accounts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tài Khoản
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Đăng Xuất
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import { useLocation } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

function LayoutDefault() {
    const location = useLocation();

    const isHomePage = location.pathname === "/";

    return (
        <>
            <div className="layout">
                {isHomePage && <Header />}
                <Main />
                {isHomePage && <Footer />}
            </div>
        </>
    );
}

export default LayoutDefault;

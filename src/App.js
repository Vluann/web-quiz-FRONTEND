import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./components/AllRoutes/allRoutes";
import { getCookie } from "./helper/cookies";
import { useDispatch } from "react-redux";
import { updateStatusLogin } from "./actions/login";
import { checkAdminLogin } from "./actions/loginAdmin";

function App() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const userToken = getCookie("token");
    const adminToken = getCookie("admin_token");

    if (userToken) {
      dispatch(updateStatusLogin(true));
    } else {
      dispatch(updateStatusLogin(false));
    }

    if (adminToken) {
      dispatch(checkAdminLogin(true));
    } else {
      dispatch(checkAdminLogin(false));
    }

    setCheckingAuth(false);
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return <AllRoutes />;
}

export default App;

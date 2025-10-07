import PrivatesAdmin from "../components/privatesAdmin/privatesAdmin";
import PrivateRoutes from "../components/privatesRoutes/privatesRoutes";
import LayoutDeafult from "../layout/layoutDefault/layoutDefault";
import LayoutPrivates from "../layout/layoutPrivates/layoutPrivates";
import Accounts from "../pages/accounts/accounts";
import Admin from "../pages/admin/admin";
import DashBoard from "../pages/dashboard/dashboard";
import AccountAdmin from "../pages/dashboardAccounts/accountAdmin";
import DashboardAdmin from "../pages/dashboardAdmin/dahboard";
import DashBoardUsers from "../pages/dashboardUser/dashboardUser";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import LoginAdmin from "../pages/loginAdmin/loginAdmin";
import Logout from "../pages/logout/logout";
import MyResults from "../pages/myResults/myResults";
import Quiz from "../pages/quiz/quiz";
import QuizzesAdmin from "../pages/quizzes/quizzes";
import Ranking from "../pages/ranking/ranking";
import Register from "../pages/register/register";
import Results from "../pages/results/results";
import ResultsItem from "../pages/resultsItem/resultsItem";

export const routes = [
  {
    path: "/",
    element: <LayoutDeafult />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login-admin",
        element: <LoginAdmin />,
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutPrivates />,
        children: [
          {
            path: "/quiz/:id",
            element: <Quiz />,
          },

          {
            path: "/logout",
            element: <Logout />,
          },

          {
            path: "/result/:id",
            element: <Results />,
          },

          {
            path: "/dashboard",
            element: <DashBoard />,
          },

          {
            path: "/result-item/:id",
            element: <ResultsItem />,
          },

          {
            path: "/myresults",
            element: <MyResults />,
          },

          {
            path: "/accounts",
            element: <Accounts />,
          },

          {
            path: "/ranking",
            element: <Ranking />,
          },
        ],
      },
    ],
  },

  {
    element: <PrivatesAdmin />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "dashboard-admin",
            element: <DashboardAdmin />,
          },

          {
            path: "dashboard-quizzes",
            element: <QuizzesAdmin />,
          },

          {
            path: "dashboard-users",
            element: <DashBoardUsers />,
          },

          {
            path: "dashboard-accounts",
            element: <AccountAdmin />,
          },
        ],
      },
    ],
  },
];

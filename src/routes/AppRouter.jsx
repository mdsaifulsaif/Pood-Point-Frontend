import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ReelLayout from "../Layouts/ReelLayout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import FoodPRegister from "../FoodPartnerAuth/Register/FoodPRegister";
import FoodLogin from "../FoodPartnerAuth/Login/FoodLogin";
import UserDashboardLayout from "../Layouts/UserDashboard/UserdashboardLyaout";
import Reels from "../components/Reels";
import FoodPostForm from "../Layouts/UserDashboard/FoodPostForm";
import About from "../pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/reels",
        element: <ReelLayout />,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/partner/register",
        element: (
          <ProtectedRoute>
            <FoodPRegister />
          </ProtectedRoute>
        ),
      },
      {
        path: "/partner/login",
        element: <FoodLogin />,
      },
    ],
  },
  // {
  //   path: "/reel",
  //   children: [
  //     {
  //       index: true,
  //       Component: ReelLayout,
  //     },
  //     {
  //       path: "/reel/videos",
  //       element: <Reels />,
  //     },
  //   ],
  //   // Component: ReelLayout,
  //   element: (
  //     <ProtectedRoute>
  //       <ReelLayout />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/dashboard/addfooditem",
        element: <FoodPostForm />,
      },
    ],
  },
]);

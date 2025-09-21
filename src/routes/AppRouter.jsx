import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ReelLayout from "../Layouts/ReelLayout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Reels from "../components/Reels";
import CreateReel from "../pages/CreateReel/CreateReel";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/CreatePost/CreatePost";
import Banner from "../components/Banner";
import LoginBanner from "../pages/Banner/LoginBanner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/reels",
    element: (
      <ProtectedRoute>
        <ReelLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Reels,
      },
      {
        path: "/reels/create-reel",
        element: (
          <ProtectedRoute>
            <CreateReel />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reels/create-post",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reels/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

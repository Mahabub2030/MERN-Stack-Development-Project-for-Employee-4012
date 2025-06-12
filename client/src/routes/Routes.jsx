import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";

import IdValedation from "../components/Dashboard/Sidebar/Menu/IdValedation";
import AddEmployeFormId from "../components/Form/AddEmployeFormId";
// import TimeSheetForm from "../components/Dashboard/Sidebar/Menu/TimeSheetForm";

import UpdateFrom from "../components/Form/UpdateFrom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      
      {
        path: "AddEmployeFormId",
        element: (
          <PrivateRoute>
            <AddEmployeFormId></AddEmployeFormId>
          </PrivateRoute>
        ),
      },
      
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "IdValedation",
        element: (
          <PrivateRoute>
            <IdValedation />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/IdValidation/UpdateFrom/:id",
        element: (
          <PrivateRoute>
            <UpdateFrom />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/EmplyeesDate/${params.id}`),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
     
      
    ],
  },
]);

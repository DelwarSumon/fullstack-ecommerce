import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../hooks/reduxHook";

export const ProtectedRoute = ({ redirectPath = "/", children }: any) => {
  const userInfo = useAppSelector((state) => state.userReducer);

  if (!userInfo.isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

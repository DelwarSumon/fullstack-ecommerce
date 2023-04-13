import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

export const ProtectedRouteAdmin = ({ redirectPath = "/", children }: any) => {
  const userInfo = useAppSelector((state) => state.userReducer);

  if (!userInfo.isLoggedIn || !userInfo.isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

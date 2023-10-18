import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  //Lấy thông tin của url
  const location = useLocation();
  if (!currentUser) {
    //user chưa đăng nhập, điều hướng về trang đăng nhập
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }
  // if (currentUser.maLoaiNguoiDung !== "QuanTri") {
  //   return <Navigate to="/404" />;
  // }
  return children || <Outlet />;
}
//TH1 : Children

// <Route path="....." element={<ProtectedRoute> <component/> </ProtectedRoute>/>

//TH2 : Outlet
// <ProtectedRoute> <Route path="....." element={<component/>}> </ProtectedRoute>

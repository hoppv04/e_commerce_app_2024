import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");
  const isAdminPage = location.pathname.includes("/admin");
  const isShopPage = location.pathname.includes("/shop");

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
    return <Navigate to="/unauth-page" />;
  }

  if (isAuthenticated && user?.role === "admin" && isShopPage) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;

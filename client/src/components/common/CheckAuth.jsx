import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");
  const isAdminPage = location.pathname.includes("/admin");
  const isShopPage = location.pathname.includes("/shop");
  const isAdmin = user?.role === "admin";
  const adminPath = "/admin/dashboard";
  const shopPath = "/shop/home";
  const loginPath = "/auth/login";

  const navigateToHome = () => {
    return isAdmin ? <Navigate to={adminPath} /> : <Navigate to={shopPath} />;
  };

  if (location.pathname === "/") {
    return isAuthenticated ? navigateToHome() : <Navigate to={loginPath} />;
  }

  if (isAuthenticated) {
    if (isAuthPage) {
      return navigateToHome();
    }
    if (!isAdmin && isAdminPage) {
      return <Navigate to="/unauth-page" />;
    }
    if (isAdmin && isShopPage) return <Navigate to={adminPath} />;
  } else {
    if (!isAuthPage) return <Navigate to={loginPath} />;
  }

  return <>{children}</>;
};

export default CheckAuth;

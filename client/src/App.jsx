import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin-view/Layout";
import AuthLayout from "./components/auth/Layout";
import CheckAuth from "./components/common/checkAuth";
import ShoppingLayout from "./components/shopping-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/Accout";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/Listing";
import UnAuthPage from "./pages/unauth-page";
import { checkAuth } from "./store/auth-slice";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        {/* Shop Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

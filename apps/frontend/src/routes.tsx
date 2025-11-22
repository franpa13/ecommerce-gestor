import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./layouts/main-layout";
import { HomePage } from "./pages/public/home/home-page";
import { ProductsPage } from "./pages/public/products/products-page";
import { AuthLayout } from "./layouts/auth-layout";
import { LoginPage } from "./pages/public/auth/login/login-page";
import { RegisterPage } from "./pages/public/auth/register/register-page";
import { CartPage } from "./pages/public/cart/cart-page";
import { ProtectedRoute } from "./layouts/protected-route";
import { ProfilePage } from "./pages/public/profile/profile-page";


export const router = createBrowserRouter([
  {
    path: '/ecommerce',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/ecommerce" />,
  },
  {
    path: "/admin",
    element: <h2>daw</h2>,
    children: [],
  }
]);

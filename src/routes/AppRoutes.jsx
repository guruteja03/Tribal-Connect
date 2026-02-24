import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleBasedRoute from '../components/RoleBasedRoute';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
import OrdersPage from '../pages/OrdersPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ArtisanDashboard from '../pages/dashboard/ArtisanDashboard';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard';
import ConsultantDashboard from '../pages/dashboard/ConsultantDashboard';
import TransactionsPage from '../pages/dashboard/TransactionsPage';
import AddProductPage from '../pages/artisan/AddProductPage';
import EditProductPage from '../pages/artisan/EditProductPage';
import MyProductsPage from '../pages/artisan/MyProductsPage';
import CheckoutPage from '../pages/customer/CheckoutPage';
import OrderHistoryPage from '../pages/customer/OrderHistoryPage';
import ReviewsPage from '../pages/customer/ReviewsPage';
import ReviewContentPage from '../pages/consultant/ReviewContentPage';
import ArtisanProfilesPage from '../pages/consultant/ArtisanProfilesPage';

function AuthRedirectRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

function AppRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <AuthRedirectRoute>
              <LoginPage />
            </AuthRedirectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirectRoute>
              <RegisterPage />
            </AuthRedirectRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/customer/checkout" element={<CheckoutPage />} />
          <Route path="/customer/order-history" element={<OrderHistoryPage />} />
          <Route path="/customer/reviews" element={<ReviewsPage />} />
        </Route>

        <Route element={<RoleBasedRoute allowedRoles={['artisan']} />}>
          <Route path="/artisan/add-product" element={<AddProductPage />} />
          <Route path="/artisan/edit-product/:id" element={<EditProductPage />} />
          <Route path="/artisan/my-products" element={<MyProductsPage />} />
        </Route>

        <Route element={<RoleBasedRoute allowedRoles={['consultant']} />}>
          <Route path="/consultant/review-content" element={<ReviewContentPage />} />
          <Route path="/consultant/artisan-profiles" element={<ArtisanProfilesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/transactions" element={<TransactionsPage />} />
          </Route>
          <Route element={<RoleBasedRoute allowedRoles={['artisan']} />}>
            <Route path="artisan" element={<ArtisanDashboard />} />
          </Route>
          <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
            <Route path="customer" element={<CustomerDashboard />} />
          </Route>
          <Route element={<RoleBasedRoute allowedRoles={['consultant']} />}>
            <Route path="consultant" element={<ConsultantDashboard />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

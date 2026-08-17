import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Blog from './pages/Blog/Blog'
import LoginPage from './pages/LoginPage/LoginPage'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import OrderTracking from './pages/OrderTracking/OrderTracking'
import Faqs from './pages/Faqs/Faqs'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from './component/ScrollToTop/ScrollToTop'

// Naye pages (backend se connect wale)
import SignupPage from './pages/SignupPage/SignupPage'
import Cart from './pages/Cart/Cart'
import Wishlist from './pages/Wishlist/Wishlist'
import Checkout from './pages/Checkout/Checkout'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'

// Route guards
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import AdminRoute from './component/AdminRoute/AdminRoute'

// Admin Panel
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import ManageProducts from './pages/Admin/ManageProducts'
import ManageOrders from './pages/Admin/ManageOrders'
import ManageMessages from './pages/Admin/ManageMessages'
import ManageNewsletter from './pages/Admin/ManageNewsletter'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        }
      >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='blog' element={<Blog />} />
        <Route path='loginpage' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='ordertracking' element={<OrderTracking />} />
        <Route path='faqs' element={<Faqs />} />

        <Route
          path='cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='wishlist'
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path='checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path='order-success'
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path='/admin'
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='products' element={<ManageProducts />} />
        <Route path='orders' element={<ManageOrders />} />
        <Route path='messages' element={<ManageMessages />} />
        <Route path='newsletter' element={<ManageNewsletter />} />
      </Route>
    </Routes>
  )
}

export default App
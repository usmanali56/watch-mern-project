import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Teeno Context Providers import kar rahe hain
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

// Toast notifications ke liye (success/error popups)
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* AuthProvider sabse bahar hai, kyunke Cart/Wishlist ko pata hona chahiye
        ke user login hai ya nahi */}
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
)
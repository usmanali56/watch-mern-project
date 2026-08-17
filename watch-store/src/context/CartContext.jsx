import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCart({ items: [] }); 
    }
  }, [isLoggedIn]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  // Add to Cart function 
  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) {
      toast.info("Please login first to add items to your cart");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/cart/add", { productId, quantity });
      setCart(data);
      toast.success("Item has been added to the cart successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "The item could not be added to the cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await API.put("/cart/update", { productId, quantity });
      setCart(data);
    } catch (error) {
      toast.error("The quantity could not be updated. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/remove/${productId}`);
      setCart(data);
      toast.info("Item has been removed from the cart.");
    } catch (error) {
      toast.error("There was a problem removing the item.");
    }
  };

  const cartCount = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{ cart, cartCount, loading, addToCart, updateQuantity, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
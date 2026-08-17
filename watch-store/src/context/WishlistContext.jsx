import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [wishlist, setWishlist] = useState({ items: [] });

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlist({ items: [] });
    }
  }, [isLoggedIn]);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      setWishlist(data);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) {
      toast.info("Please login first to use the wishlist.");
      return;
    }
    try {
      const { data } = await API.post("/wishlist/toggle", { productId });
      setWishlist(data);
    } catch (error) {
      toast.error("The wishlist could not be updated. Please try again.");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.items?.some((item) => item.product?._id === productId) || false;
  };

  const wishlistCount = wishlist.items?.length || 0;

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistCount, toggleWishlist, isInWishlist, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
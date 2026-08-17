import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const tabs = ["BEST SELLERS", "NEW ARRIVALS", "BEST REVIEWED"];

export default function Category() {
  const [activeTab, setActiveTab] = useState("BEST SELLERS");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cart aur Wishlist ka asal (real) data Context se le rahe hain
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Component load hote hi backend se products mangwa lete hain
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/products");
      // Home page par sirf pehle 8 products dikhate hain (jaisa design mein tha)
      setProducts(data.slice(0, 8));
    } catch (error) {
      console.error("Products fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
      {/* Tabs */}
      <div data-aos="fade-up" className="flex justify-center gap-8 mb-10 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium tracking-wide pb-1 border-b-2 transition-colors ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <p className="text-center text-gray-400 py-10">Products loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No product have been added yet</p>
      ) : (
        /* Product Grid */
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              {/* Image with wishlist icon */}
              <div data-aos="fade-up" className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart
                    size={18}
                    className={isInWishlist(product._id) ? "fill-black" : "fill-none"}
                  />
                </button>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm font-medium tracking-wide uppercase">
                {product.name}
              </h3>

              {/* Price / Add to cart on hover */}
              <div className="mt-1 text-sm">
                <span className="text-gray-700 group-hover:hidden">
                  ${product.price?.toLocaleString()}.00
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="hidden group-hover:inline text-black underline"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
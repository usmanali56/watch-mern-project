import { createContext, useContext, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // Signup function
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/auth/signup", { name, email, password });

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      toast.success("Account open.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      toast.success(`Welcome back., ${data.name}!`);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logout");
  };

  return (
    <AuthContext.Provider
      value={{
        user,               // { _id, name, email, role, token }
        isAdmin: user?.role === "admin",
        isLoggedIn: !!user,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
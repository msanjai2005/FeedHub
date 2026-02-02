import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
   const [clicked,setClicked] = useState(false);

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const res = await api.get("/auth/is-auth",{withCredentials: true});
      setUser(res?.data?.user);
      console.log(res);
    } catch (error) {
      setUser(null);
      console.log("Error in auth check:", error);
    }
    setAuthLoading(false);
  };

  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);
    setUser(res.data.user);
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // ✅ CORRECT useEffect
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, authLoading, clicked, setClicked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

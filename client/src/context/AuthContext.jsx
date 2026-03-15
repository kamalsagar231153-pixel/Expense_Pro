import { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setUser({ authenticated: true });
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);

      // Backend response:
      // { success, data: { accessToken, refreshToken } }

      const accessToken = res.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      setUser({ authenticated: true });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (data) => {
    try {
      await authService.register(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Register failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
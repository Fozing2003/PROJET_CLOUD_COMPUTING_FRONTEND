/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { PUBLIC_GATWAY_URL } from "../api";

const API_URL = PUBLIC_GATWAY_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis les cookies
  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (token && userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN (Laravel)
  const login = async (email, password) => {
    const res = await axios.post(
      "/api/login",
      { email, password },
      {
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const token = res.data.token;

    Cookies.set("token", token, { expires: 3 });
    Cookies.set("user", JSON.stringify(res.data.user), { expires: 3 });

    setUser(res.data.user);
  };

  // 📝 REGISTER (Laravel)
  const register = async (data) => {
    await axios.post(
      "/api/register",
      data,
      {
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  // 🚪 LOGOUT (Laravel)
  const logout = async () => {
    const token = Cookies.get("token");

    if (token) {
      await axios.post(
        "/api/logout",
        {},
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    }

    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// 🔑 Récupérer le token
export const getToken = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");
  return token;
};

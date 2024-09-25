"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {isTokenExpired}  from "../utils/tokenHelper"

type User = {
  userProfile: string;
  id: string;
  username: string;
  role: "admin" | "user";
  
  // Add other user properties if needed
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser:any
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        logout(); 
      } else {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        router.push(user?.role === "admin" ? "/admin/dashboard" : "/user/home");
      }
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const login = (token: string, user: User) => {
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user)); 
    setToken(token);
    setUser(user);

    router.push(user.role === "admin" ? "/admin/dashboard" : "/user/home");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

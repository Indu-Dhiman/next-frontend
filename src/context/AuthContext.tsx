"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type AuthContextType = {
  token: string | null;
  role: "admin" | "user" | null;
  username:string |null ;
  login: (token: string, role: "admin" | "user",username:any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");
    const username = Cookies.get("username");

    if (token && userRole && username) {
      setToken(token);
      setRole(userRole as "admin" | "user");
      setUsername(username);
      router.push(userRole === "admin" ? "/admin/dashboard" : "/user/home");
    }
  }, [router]);

  const login = (token: string, userRole: "admin" | "user", username: string) => {
    Cookies.set("token", token);
    Cookies.set("role", userRole);
    Cookies.set("username", username);
    setToken(token);
    setRole(userRole);
    setUsername(username);

    if (userRole === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/home");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("username");
    setToken(null);
    setRole(null);
    setUsername(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, username }}>
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

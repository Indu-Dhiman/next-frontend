"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import { notifyError } from "../../../utils/notifications"


const Login = () => {
  const { login }: any = useAuth();

  console.log("hhg")
  const handleLogin = async (data: { email: string; password: string }) => {
    console.log("first")
    try {
      const response: any = await post("user/login", data);
      login(response.token, response.role);
    } catch (err: any) {
      console.log(err,"------")
      if (err.code) {
        notifyError(err.code,"2000","id");
      } else {
        notifyError("Unknown error");
      }    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;

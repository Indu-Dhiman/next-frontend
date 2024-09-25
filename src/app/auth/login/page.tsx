"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import { notifyError } from "../../../utils/notifications"
import {  ErrorResponse, SignupData, SignupResponse } from "@/types/auth";


const Login = () => {
  const { login } = useAuth();

  const handleLogin = async (data: SignupData) => {
    try {
      const response: SignupResponse = await post("user/login", data);
      console.log(response, "response");
  
      const user = {
        id: response.data?.user?.id,
        username: response.data?.user?.username,
        role: response.data?.user?.role,
        userProfile:response?.data?.user?.userProfile
      };
  
      login(response.data?.accessToken, user);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const error = err as ErrorResponse; 
        notifyError(error.code, "2000", "id");
      } else {
        notifyError("Unknown error");
      }
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;

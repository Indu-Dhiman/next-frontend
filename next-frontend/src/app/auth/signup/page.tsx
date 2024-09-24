"use client";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import { notifyError } from "@/utils/notifications";
import React from "react";

const Signup = () => {
  const { login }: any = useAuth();

  const handleSignup = async (data: { email: string; password: string }) => {
    try {
      const response: any = await post("user/signup", data);
      console.log(response,"respo")
      login(response.data?.accessToken, response?.data?.user?.role);
    } catch (err: any) {
      console.log(err, "------");
      if (err.code) {
        notifyError(err.code,"2000","id");
      } else {
        notifyError("Unknown error");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;

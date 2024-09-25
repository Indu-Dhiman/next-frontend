"use client";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import { ErrorResponse, SignupData, SignupResponse } from "@/types/auth";
import { notifyError } from "@/utils/notifications";
import React from "react";


const Signup = () => {
  const { login } = useAuth();
  
  const handleSignup = async (data: SignupData) => {
    try {
      const response: SignupResponse = await post("user/signup", data);
      const user = {
        id: response.data?.user?.id,
        username: response.data?.user?.username,
        role: response.data?.user?.role,
        userProfile:response?.data?.user?.userProfile

        // Include any other necessary user properties
      };
      login(response.data?.accessToken, user);
    } catch (err: unknown) {
      // Type guard to check if err is an ErrorResponse
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const error = err as ErrorResponse; // Assert to ErrorResponse
        notifyError(error.code, "2000", "id");
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

// src/pages/Login.tsx
"use client"
import AuthForm from '@/components/AuthForm';
import React from 'react';

const Login = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;

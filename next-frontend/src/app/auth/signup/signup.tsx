
import AuthForm from '@/components/AuthForm';
import React from 'react';

const Signup = () => {
  const handleSignup = (data: { username: string; email: string; password: string; role?: string }) => {
    console.log('Signup data:', data);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;

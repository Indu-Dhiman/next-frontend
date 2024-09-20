// src/components/AuthForm.tsx

import React from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { username: string; email: string; password: string; role?: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    role: type === 'signup' ? 'user' : undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {type === 'signup' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {type === 'signup' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={()=>handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

"use client";
import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "@/utils/validation";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: type === "signup" ? "user" : undefined,
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {type === "signup" && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#164e63] text-white py-3 rounded-md transition duration-150"
            >
              {type === "login" ? "Login" : "Sign Up"}
            </button>
            {type === "login" && (
              <p className="mt-6 text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;

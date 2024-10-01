"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import { notifyError } from "../../../utils/notifications";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  // const { googleSignIn, facebookSignIn, appleSignIn } = useLoginAuth();

  const handleLogin = async (data: any) => {
    try {
      const response: any = await post("user/login", data);
      console.log(response, "response");

      const user = {
        id: response.data?.user?.id,
        username: response.data?.user?.username,
        role: response.data?.user?.role,
        userProfile: response?.data?.user?.userProfile,
      };

      login(response.data?.accessToken, user);
    } catch (err: any) {
      notifyError(err.code, "2000", "id");
    }
  };

  const socialSignIn = async (e: any, platform: string) => {
    e.preventDefault();
    try {
      let userData;
      if (platform === "google") {
        userData = await googleSignIn();
      } else if (platform === "facebook") {
        userData = await facebookSignIn();
      } else if (platform === "apple") {
        userData = await appleSignIn();
      }

      if (userData && userData.email) {
        const mainFormData = {
          firstname: userData?.displayName,
          email: userData?.email,
          mobilenumber: userData?.phoneNumber,
          platform: platform,
        };
        const url = "api/v1/loginRegister";
        const mainResponse :any= await post(url, mainFormData);
        if (mainResponse.success === true) {
          const searchText = localStorage.getItem("initialdata");
          if (searchText == "" || searchText == null) {
            router.push("/home");

          } else {
            router.push("/review")
          }
          // toasterSuccess(
          //   "Login SucessFully",
          //   1000, mainResponse?.result?.id
          // );
        } else {
          // toasterError(mainResponse?.error, 3000, "id");
          // setIsSubmitting(false);
        }
      } else {
        console.error("User or email is null");
      }
    } catch (error) {
      console.error("Error during social sign-in:", error);
      // setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} />
      <div className="flex space-x-4 mt-4 text-center">
        <button
          className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md bg-red-600 focus:outline-none"
          onClick={(e) => socialSignIn(e, "google")}
        >
          <Image
            className="w-[25px] mx-auto mb-1"
            src="/images/google.png"
            height={500}
            width={500}
            loading="lazy"
            alt="google"
          />
          <b className="font-normal text-white">Google</b>
        </button>
        <button
          className="w-1/3 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none"
          onClick={(e) => socialSignIn(e, "facebook")}
        >
          <Image
            className="w-[25px] mx-auto mb-1"
            src="/images/fb1.png"
            alt="fb"
            height={500}
            width={500}
            loading="lazy"
          />
          <b className=" text-white font-normal">Facebook</b>
        </button>
        <button
          className="w-1/3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none"
          onClick={(e) => socialSignIn(e, "apple")}
        >
          <Image
            className="w-[25px] mx-auto mb-1"
            src="/images/apple.png"
            alt="apple"
            height={500}
            width={500}
            loading="lazy"
          />
          <b className=" text-white font-normal">Apple</b>
        </button>
      </div>
    </div>
  );
};

export default Login;


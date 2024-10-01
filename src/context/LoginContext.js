"use client"
import React, { useContext, createContext, useState, useEffect } from "react";
import { 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

import {
  auth,
  provider,
  facebookProvider,
  appleProvider,
} from "../frontend/firebase";
import { useRouter } from "next/navigation";
import useTranslations from "@/hooks/useTranslation";
import { toasterSuccess } from "@/components/core/Toaster";

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {

  const router = useRouter();
  const { translations } = useTranslations();
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    try {

      if (Capacitor.isNativePlatform()) {

        const result = await FirebaseAuthentication.signInWithGoogle();

        const credential = GoogleAuthProvider.credential(
          result.credential?.idToken
        );

        const auth = getAuth();
        const result2 = await signInWithCredential(auth, credential);
        return result2?.user;
      } else {
        const result = await signInWithPopup(auth, provider);
        return result?.user;
      }
    } catch (error) {
      throw new Error("Failed to sign in with Google");
    }
  };

  const facebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      return result?.user;
    } catch (error) {
      console.error("Failed to sign in with Facebook", error);
    }
  };

  const appleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      return result?.user;
    } catch (error) {
      console.error("Failed to sign in with Apple", error);
    }
  };

  const logOut = () => {
    if (Capacitor.isNativePlatform()){
      FirebaseAuthentication.signOut()
      .then(() => {
        router.push("/auth/login");
        localStorage.removeItem("token");
        toasterSuccess(translations?.common?.logOutSucess, 1000, "id");
      })
      .catch((error) => {
        console.error("Failed to sign out", error);
      });
    } else {   
      signOut(auth)
        .then(() => {
          router.push("/auth/login");
          localStorage.removeItem("token");
          toasterSuccess(translations?.common?.logOutSucess, 1000, "id");
        })
        .catch((error) => {
          console.error("Failed to sign out", error);
        });
    }
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, facebookSignIn, logOut, appleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLoginAuth = () => {
  return useContext(LoginContext);
};

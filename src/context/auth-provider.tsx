"use client";

import useAuth from "@/hooks/use-auth";
import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";


type UserType = {
  id: string,
  name: string;
  email: string;
  role: string,
  avatar: string
};

type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useAuth();

  const user = {
    id: data?.data?.data?.id,
    name: data?.data?.data?.name,
    email: data?.data?.data?.email,
    role: data?.data?.data?.role,
    avatar: data?.data?.data?.profile?.avatar
  }

  if(data){
    Cookies.set("role", data.data.data.role, {
      secure: false,
      sameSite: "strict",
    });
  }
  
  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

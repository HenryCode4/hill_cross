"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface EnrollmentContextType {
  enrollments: any[];
  setEnrollments: (data: any[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

const initialState: EnrollmentContextType = {
  enrollments: [],
  setEnrollments: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  isLoading: false,
  setIsLoading: () => {},
  totalPages: 1,
  setTotalPages: () => {},
};

const EnrollmentContext = createContext<EnrollmentContextType>(initialState);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const value = {
    enrollments,
    setEnrollments,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    totalPages,
    setTotalPages,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollmentContext = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error("useEnrollmentContext must be used within EnrollmentProvider");
  }
  return context;
};

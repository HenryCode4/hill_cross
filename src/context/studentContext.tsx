"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import useStudentData, { StudentFilters } from "@/hooks/useStudent";

// Define the Student type based on your data structure


interface StudentContextType {
    students: any[];
    setStudents: (students: any[]) => void;
    filters: StudentFilters;
    setFilters: (filters: StudentFilters) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    totalPages: number;
    setTotalPages: (pages: number) => void;
  }

  const initialState: StudentContextType = {
    students: [],
    setStudents: () => {},
    filters: {},
    setFilters: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    isLoading: false,
    setIsLoading: () => {},
    totalPages: 1,
    setTotalPages: () => {},
  };

const StudentContext = createContext<StudentContextType>(initialState);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<any[]>([]);
    const [filters, setFilters] = useState<StudentFilters>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
  
    const value = {
      students,
      setStudents,
      filters,
      setFilters,
      currentPage,
      setCurrentPage,
      isLoading,
      setIsLoading,
      totalPages,
      setTotalPages,
    };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};
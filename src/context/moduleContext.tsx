"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import useStudentData, { StudentFilters } from "@/hooks/useStudent";

// Define the Student type based on your data structure


interface TeacherContextType {
    teacher: any[];
    setTeacher: (students: any[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    totalPages: number;
    setTotalPages: (pages: number) => void;
  }

  const initialState: TeacherContextType = {
    teacher: [],
    setTeacher: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    isLoading: false,
    setIsLoading: () => {},
    totalPages: 1,
    setTotalPages: () => {},
  };

const TeacherContext = createContext<TeacherContextType>(initialState);

export const TeacherProvider = ({ children }: { children: ReactNode }) => {
    const [teacher, setTeacher] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
  
    const value = {
      teacher,
      setTeacher,
      currentPage,
      setCurrentPage,
      isLoading,
      setIsLoading,
      totalPages,
      setTotalPages,
    };

  return (
    <TeacherContext.Provider value={value}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};
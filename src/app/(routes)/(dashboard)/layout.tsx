"use client"


import { useEnrollmentContext } from "@/context/enrollmentContext";
import { useTeacherContext } from "@/context/moduleContext";
import { useStudentContext } from "@/context/studentContext";
import { useAllocateModuleData } from "@/hooks/useAllocateModule";
import useStudentData, { useStudentEnrollmentData } from "@/hooks/useStudent";
import { useEffect, useState } from "react";

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { 
        setStudents, 
        filters, 
        currentPage, 
        setIsLoading, 
        setTotalPages 
      } = useStudentContext();

    const { 
        setTeacher, 
        currentPage: teacherCurrentPage, 
        setIsLoading: setTeacherIsLoading, 
        setTotalPages: setTeacherTotalPages
      } = useTeacherContext();

      const {
        setEnrollments,
        currentPage: enrollmentCurrentPage,
        setIsLoading: enrollmentSetIsLoading,
        setTotalPages: enrollmentSetTotalPages,
      } = useEnrollmentContext();
  
    // Use the existing useStudentData hook to fetch and cache data
    const { data: studentData, isLoading } = useStudentData(currentPage.toString(), filters);

    //  const {data: teacher, isLoading:isTeacherLoading} = useAllocateModuleData(
    //     teacherCurrentPage.toString()
    //     );

    // const { data: enrollmentData, isLoading: enrollmentIsLoading } = useStudentEnrollmentData(enrollmentCurrentPage.toString());

    // Update the context when data is loaded
    useEffect(() => {
        setIsLoading(isLoading);

      if (studentData?.data?.data) {
      setStudents(studentData.data?.data);
      setTotalPages(studentData?.data?.meta?.last_page || 1);
    }
  }, [studentData, setStudents, setIsLoading, setTotalPages, isLoading]);

//     useEffect(() => {
//         setTeacherIsLoading(isTeacherLoading);

//       if (teacher?.data?.data) {
//         setTeacher(teacher.data?.data);
//         setTeacherTotalPages(teacher?.data?.meta?.last_page || 1);
//     }
//   }, [teacher, setTeacher, setTeacherIsLoading, setTeacherTotalPages, isTeacherLoading]);

//   useEffect(() => {
//     enrollmentSetIsLoading(enrollmentIsLoading);

//     if (enrollmentData?.data?.data) {
//       setEnrollments(enrollmentData.data.data); // only pass the list
//       enrollmentSetTotalPages(enrollmentData.data.meta?.last_page || 1);
//     }
//   }, [enrollmentData, enrollmentIsLoading]);

  return (
      <>
          {children}
      </>
  );
}

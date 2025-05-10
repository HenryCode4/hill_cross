"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import { TeacherProvider } from "@/context/moduleContext";
import { StudentProvider, useStudentContext } from "@/context/studentContext";
import useStudentData from "@/hooks/useStudent";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggle, setToggle] = useState(false);

  return (
    <AuthProvider>
      <StudentProvider>
        <TeacherProvider>
          <div className="min-h-screen w-full bg-[#F8F8F8]">
            <Navbar setToggle={setToggle} />
            <div className="fixed z-[999]">
              <Sidebar toggle={toggle} setToggle={setToggle} />
            </div>
            <main className="h-full w-full md:pl-[323px]">{children}</main>
          </div>
        </TeacherProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

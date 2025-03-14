"use client"

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggle, setToggle] = useState(false)
  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-[#F8F8F8]">
        <Navbar setToggle={setToggle}/>
        <div className="fixed z-[999]">

        <Sidebar toggle={toggle} setToggle={setToggle} />
        </div>
        <main className=" w-full h-full md:pl-[323px]">
          {children}
        </main>
    </div>
    </AuthProvider>
    
  );
}

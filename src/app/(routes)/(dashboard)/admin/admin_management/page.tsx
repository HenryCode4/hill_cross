"use client";

import {
  arrowRight,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
} from "@/assets";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AdminUsers from "./AdminUsers";
import AddAdmin from "./AddAdmin";
import Permission from "./Permission";

const AdminManagePage = () => {
  const permission = [
    "create_student",
    "update_student",
    "regenerate_student_admission_letter",
    "grant_admission_letter",
    "disable_student",
    "enable_student",
    "delete_student",
    "view_student_profile",
    "assign_student_to_class",
    "remove_student_from_class",
    "update_student_grades",
    "view_student_grades",
    "create_teacher",
    "update_teacher",
    "assign_teacher_to_class",
    "remove_teacher_from_class",
    "view_teacher_profile",
    "create_class",
    "update_class",
    "delete_class",
    "view_class_schedule",
    "assign_teacher_to_subject",
    "remove_teacher_from_subject",
    "create_subject",
    "update_subject",
    "delete_subject",
    "assign_student_to_subject",
    "remove_student_from_subject",
    "generate_student_report_card",
    "generate_class_report",
    "view_class_report",
    "manage_school_fees",
    "update_school_fees",
    "approve_fee_payment",
    "manage_scholarships",
    "create_scholarship",
    "assign_scholarship_to_student",
    "view_scholarship_details",
    "manage_school_events",
    "create_event",
    "update_event",
    "cancel_event",
    "register_student_for_event",
    "remove_student_from_event",
    "view_event_participants",
  ];

  const [permissions, setPermissions] = useState(permission);
  
  const [tab, setTab] = useState(1);
  const [tabAdmin, setTabAdmin] = useState<number | null>(0);
  const [addAdmin, setAddAdmin] = useState("");

  // Function to remove a permission
  const removePermission = (permission: string) => {
    setPermissions(permissions.filter((item) => item !== permission));
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Admin Management"} hideSearch />

      <div className="flex w-full justify-between bg-white px-[32px] py-[22px]">
        <div className="flex flex-col xl:flex-row gap-x-[33px] ">
          <button
            onClick={() => setTab(1)}
            className={`${tab === 1 && "font-[600] text-[#9D1217]"} text-start text-[24px]`}
          >
            Admin Users
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${tab === 2 && "font-[600] text-[#9D1217]"} text-start text-[24px]`}
          >
            Manage Roles
          </button>
        </div>

        {
          tabAdmin !== 4 && (
            <div>
            <button onClick={() => {
              setTab(2)
              setAddAdmin("admin")
              setTabAdmin(null)
            }} className="w-[113px] rounded-[8px] bg-[#ED1000] py-[7px] text-white">
              Add Admin
            </button>
          </div>
          )
        }
        
      </div>

      {tab === 1 ? (
       <AdminUsers />
      ) : (
        <div className="flex flex-col xl:flex-row w-full gap-[20px]">
          

            <Permission tabAdmin={tabAdmin} removePermission={removePermission} setTabAdmin={setTabAdmin} setAddAdmin={setAddAdmin}/>


            {
              addAdmin === "admin" && (
                <AddAdmin tabAdmin={tabAdmin} />
              )
            }
          
          
        </div>
      )}
    </div>
  );
};

export default AdminManagePage;

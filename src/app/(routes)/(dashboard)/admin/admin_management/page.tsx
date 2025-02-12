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
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  const [tab, setTab] = useState(1);
  const [tabAdmin, setTabAdmin] = useState(1);

  const staffs = [
    {
      name: "Michelle James",
      role: "Admin",
      email: "admin@gmail.com",
      permission: "Office Support",
    },
    {
      name: "Michelle James",
      role: "Admin",
      email: "admin@gmail.com",
      permission: "Office Support",
    },
    {
      name: "Michelle James",
      role: "Admin",
      email: "admin@gmail.com",
      permission: "Office Support",
    },
  ];

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
              setTabAdmin(4)
            }} className="w-[113px] rounded-[8px] bg-[#ED1000] py-[7px] text-white">
              Add Admin
            </button>
          </div>
          )
        }
        
      </div>

      {tab === 1 ? (
        <div className="grid grid-col-1 xl:grid-cols-2  2xl:grid-cols-3 place-content-center xl:place-content-start gap-x-[31px] gap-y-[31px]">
          {staffs.map((item, i) => (
            <div key={i} className="relative h-auto w-[350px] rounded-[16px] border border-[#B0B0B0] bg-white px-[15px] py-[20px]">
              <div className="flex w-full flex-col items-center justify-center gap-y-[12px]">
                <Image
                  src={avatars[i % avatars.length]} // This ensures avatars cycle from start after reaching the end
                  alt={`Avatar for ${item.name}`}
                  width={100} // Set the width of the image
                  height={100} // Set the height of the image
                  className="rounded-full" // Optional: to make the avatar round
                />

                <div className="flex w-full flex-col items-center gap-y-[8px]">
                  <p className="text-[20px] font-[500]">{item.name}</p>
                  <p className="text-[14px] font-[500] text-[#5B5B5B]">
                    {"Admin"}
                  </p>
                </div>
              </div>

              <div className="w-full p-2 pb-[38px] pt-[46px]">
                <div className="flex w-full justify-between border-b">
                  <p className="py-[14px] font-[400] text-[#5B5B5B]">Email:</p>
                  <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                    {item.email}
                  </p>
                </div>
                <div className="flex w-full justify-between border-b">
                  <p className="py-[14px] font-[400] text-[#5B5B5B]">
                    Permission:
                  </p>
                  <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                    {item.permission}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-x-[16px]">
                <Link
                  href={`/hr_management/academic_staff/${1}`}
                  className="flex h-[48px] w-[159px] items-center justify-center rounded-[8px] bg-[#ED1000]"
                >
                  <button className="font-[500] text-[#FCF9F9]">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row w-full gap-[20px]">
          <div className="h-auto w-full xl:w-[452px] rounded-[16px] bg-white">
            <div className="grid h-[76px] w-full grid-cols-2 border-b border-[#B0B0B0]">
              <div className="flex items-center justify-center">
                <h3 className="font-[500]">Manage admin roles</h3>
              </div>
              <div className="flex items-center justify-center">
                <button className="h-[35px] w-[152px] rounded-[8px] bg-[#ED1000] font-[500] text-white">
                  Add Admin level
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-y-[23px] px-[22px] py-[35px]">
              <button
                onClick={() => setTabAdmin(1)}
                className={`${tabAdmin === 1 ? "bg-[#EB001B] text-white" : "bg-[#F5F5F5]"} flex h-[52px] w-full justify-between border border-[#DADADA] px-[18px] py-[12px]`}
              >
                <p className={`text-[16px] font-[500]`}>Office Assistant</p>
                {/* <Image src={arrowRight} alt='arrow right image' /> */}
                <ChevronRight
                  size={24}
                  className={`${tabAdmin === 1 ? "text-white" : "text-[#000000]"}`}
                />
              </button>
              <button
                onClick={() => setTabAdmin(2)}
                className={`${tabAdmin === 2 ? "bg-[#EB001B] text-white" : "bg-[#F5F5F5]"} flex h-[52px] w-full justify-between border border-[#DADADA] px-[18px] py-[12px]`}
              >
                <p className="text-[16px] font-[500]">Admin</p>
                <ChevronRight
                  size={24}
                  className={`${tabAdmin === 2 ? "text-white" : "text-[#000000]"}`}
                />
              </button>
              <button
                onClick={() => setTabAdmin(3)}
                className={`${tabAdmin === 3 ? "bg-[#EB001B] text-white" : "bg-[#F5F5F5]"} flex h-[52px] w-full justify-between border border-[#DADADA] px-[18px] py-[12px]`}
              >
                <p className="text-[16px] font-[500]">Super Admin</p>
                <ChevronRight
                  size={24}
                  className={`${tabAdmin === 3 ? "text-white" : "text-[#000000]"}`}
                />
              </button>
            </div>
          </div>

            {
              tabAdmin === 1 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Office Assistant
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission}
                    </span>
                    <button
                      onClick={() => removePermission(permission)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            }


            {
              tabAdmin === 2 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Admin
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission}
                    </span>
                    <button
                      onClick={() => removePermission(permission)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            }

            {
              tabAdmin === 3 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Super Admin
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission}
                    </span>
                    <button
                      onClick={() => removePermission(permission)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            }


            {
              tabAdmin === 4 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Add Admin
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="grid 2xl:grid-cols-2 gap-[12px] w-full p-[25px]">
                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Full Name</Label>
                  <Input placeholder="Jessica" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
                </div>

                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Email</Label>
                  <Input placeholder="jessica@gmail.com" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
                </div>

                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Cell Phone Number</Label>
                  <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
                </div>

                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Designation</Label>
                  <SelectComponent className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]" items={["Designation"]} placeholder="Select Designation" />
                </div>

                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Create Password <span className="text-[#038F3E]">*</span></Label>
                  <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
                </div>

                <div className="flex flex-col gap-y-[12px]">
                  <Label className="text-[#595959] font-[500]">Confirm Password <span className="text-[#038F3E]">*</span></Label>
                  <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                {
                  tabAdmin === 4 ? ("Add Admin") : ("Save Changes")
                }
                
              </button>
            </div>
          </div>
              )
            }
          
          
        </div>
      )}
    </div>
  );
};

export default AdminManagePage;

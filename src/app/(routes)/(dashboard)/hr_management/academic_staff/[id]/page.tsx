"use client";

import { detailsAvatar } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InputPage from "../../../student-mgt/_component/input";
import { useQuery } from "@tanstack/react-query";
import { getAcademicStaffById } from "@/lib/api";
import { useUpdateAcademicStaffById } from "@/hooks/useHrMgt";
import { toast } from "@/hooks/use-toast";

const AcademicStaffSinglePage = () => {
  const params = useParams();
  const staffId = params?.id as string;
  const { mutate: updateStaff } = useUpdateAcademicStaffById();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    mode: "",
    // qualification: "",
    position: "",
    address: "",
    profileImage: "",
    staffId: "",
    password: "",
    rePassword: "",
  });

  const {
    data: staffData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hrData", staffId],
    queryFn: () => getAcademicStaffById(staffId),
    enabled: !!staffId,
  });

  useEffect(() => {
    if (!staffData) return;
    console.log(staffData);

    const profile = staffData.profile || {};

    setFormState({
      firstName: staffData.name?.split(" ")[0] || "",
      lastName: staffData.name?.split(" ").slice(1).join(" ") || "",
      email: staffData.email || "",
      phoneNumber: staffData.phone_number || "",
      dob: profile.dob || "",
      gender: profile.gender || "",
      mode: staffData.mode || "",
      // qualification: profile.qualification || "",
      position: profile.position || "",
      address: profile.address || "",
      profileImage: profile.profile_photo || "",
      staffId: profile.staff_id || "",
      password: "",
      rePassword: "",
    });
  }, [staffData]);

  const handleInputChange =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = () => {
    if (formState.password !== formState.rePassword) {
      toast({
        title: "Error",
        description: "Password do not match",
        variant: "destructive",
      });
      return;
    }
    updateStaff({
      id: staffId,
      payload: {
        file_type: "image",
        first_name: formState.firstName,
        last_name: formState.lastName,
        email: formState.email,
        phone_number: formState.phoneNumber,
        dob: formState.dob,
        gender: formState.gender,
        mode: formState.mode,
        // qualification: formState.qualification,
        position: formState.position,
        address: formState.address,
        staff_id: formState.staffId,
        password: formState.password,
        re_password: formState.rePassword,
        avatar: formState.profileImage,
        file_url: formState.profileImage,
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        title={"Academic Staff’s Profile"}
        subTitle={"HR Management"}
        hideSearch
        backIcon
      />

      <div className="relative flex flex-col rounded-[24px] bg-white">
        <div className="absolute left-[42px] top-[103px]">
          <Image
            src={formState.profileImage || detailsAvatar}
            width={80}
            height={80}
            alt="Profile Image"
            className="h-[80px] w-[80px] rounded-full"
          />
        </div>

        <div className="h-[192px] bg-[#F6DE9D]"></div>
        <div className="grid grid-cols-2 gap-[20px] p-[24px]">
          <InputPage
            title="First Name"
            value={formState.firstName}
            onChange={handleInputChange("firstName")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Last Name"
            value={formState.lastName}
            onChange={handleInputChange("lastName")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Email"
            value={formState.email}
            onChange={handleInputChange("email")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Phone Number"
            value={formState.phoneNumber}
            onChange={handleInputChange("phoneNumber")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Date of Birth"
            value={formState.dob}
            onChange={handleInputChange("dob")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Gender"
            value={formState.gender}
            onChange={handleInputChange("gender")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Mode"
            value={formState.mode}
            onChange={handleInputChange("mode")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          {/* <InputPage
            title="Qualification"
            value={formState.qualification}
            onChange={handleInputChange("qualification")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          /> */}
          <InputPage
            title="Position"
            value={formState.position}
            onChange={handleInputChange("position")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <InputPage
            title="Address"
            value={formState.address}
            onChange={handleInputChange("address")}
            placeholder=""
            className="col-span-2"
          />
          <InputPage
            title="Staff ID"
            value={formState.staffId}
            onChange={handleInputChange("staffId")}
            placeholder=""
            className="col-span-2 xl:col-span-1"
          />
          <div>
            <label className="text-[16px] font-[600]">Password</label>
            <input
              title="Password"
              type="password"
              value={formState.password}
              onChange={handleInputChange("password")}
              placeholder="Type in Password"
              className="mt-2 h-[43px] w-full overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] px-[16px] outline-none"
            />
          </div>

          <div>
            <label className="text-[16px] font-[600]">Confirm Password</label>
            <input
              title="Re-type Password"
              type="password"
              value={formState.rePassword}
              onChange={handleInputChange("rePassword")}
              placeholder="Confirm Password"
              className="mt-3 h-[43px] w-full overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] px-[16px] outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mx-auto mt-[20px] rounded bg-[#9D1217] px-[24px] py-[12px] text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AcademicStaffSinglePage;

import {
  application,
  applicationStop,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  cancel,
  horizontal,
  visibility,
  visible,
} from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import student from "@/lib/student-mgt.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Link from "next/link";
import CustomDropdown, { DropdownOption } from "@/components/customDropdownOptional";
import { useStudentActionMutation } from "@/hooks/useStudent";
import { useRouter } from "next/navigation";
import Warning from "@/components/warning";

interface student {
  avatar: string;
  name: string;
  qualification: number;
  academicCalendar: string;
  module: string;
  enrollmentDate: string;
  status: string;
  studentId: string;
  registrationId: string;
  phoneNumber: string;
  registrationStatus: string;
  school: string;
  registrationDate: string;
  creationDate: string;
  admissionStatus: string;
  action: string;
}

interface ApplicantGridProps {
  studentApi: any;
}

const ApplicantGrid = ({ studentApi }: ApplicantGridProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [confirmAdmissionOpen, setConfirmAdmissionOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const router = useRouter(); 

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

   // Define dropdown options
     const dropdownOptions: DropdownOption[] = [
      {
        id: 'show',
        label: 'Show Student',
        action: 'show student',
      },
      {
        id: 'edit',
        label: 'Edit Student',
        action: 'edit student',
      },
      {
        id: 'delete',
        label: 'Delete Account',
        action: 'delete account',
      },
      {
        id: 'grant',
        label: 'Grant Admission',
        action: 'grant admission',
        // This option is only visible if registration status is Completed
        hidden: (item: any) => item.registrationStatus !== 'Completed',
      },
      {
        id: 'print',
        label: 'Print Details',
        action: 'print details',
      },
    ];
  
    const handleAction = (action: string, student: any) => {
      setSelectedStudent(student);
      switch (action) {
        case 'show student':
          router.push(`/student-mgt/${student.studentId}`);
          break;
        case 'edit student':
          setEditModalOpen(true);
          break;
        case 'delete account':
          setDeleteModalOpen(true);
          break;
        case 'grant admission':
          setConfirmAdmissionOpen(true);
          break;
        case 'print details':
          handlePrintDetails(student);
          break;
      }
    };
  
    const handleCloseAdmissionModal = () => {
      setConfirmAdmissionOpen(false);
    };
  
    const {mutate: performStudentAction, isPending: isStudentActionLoading,} = useStudentActionMutation(
      {
      onSuccess: () => {
        setConfirmAdmissionOpen(false);
        // setConfirmAdmissionOpen(false);
        // setSelectedStudent(null);
      },
      onError: (error) => {
        setConfirmAdmissionOpen(false);
        console.log(error.message);
      },
    }
  );
  
  
  
    const handlePrintDetails = (student: any) => {
      window.print();
    };
  
  return (
    <div className="flex h-full w-full justify-center px-[8px]">
      <div className="grid gap-x-[31px] gap-y-[31px] xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
        {studentApi?.map((item: any, i: any) => (
          <div
            key={i}
            className="relative h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white px-[15px] py-[20px] md:w-[350px]"
          >
            <div className="absolute right-[25px] top-[15px]">
              <CustomDropdown 
                triggerIcon={applicationStop}
                options={dropdownOptions}
                item={item}
                onActionSelect={handleAction}
                position="auto" // Display dropdown above the trigger button
                grid
              />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-y-[12px]">
              <Image
                src={avatars[i % avatars.length]} // This ensures avatars cycle from start after reaching the end
                alt={`Avatar for ${item.name}`}
                width={100} // Set the width of the image
                height={100} // Set the height of the image
                className="rounded-full" // Optional: to make the avatar round
              />

              <p className="text-[20px] font-[500]">{item.name}</p>
            </div>

            <div className="w-full p-2 pb-[38px] pt-[46px]">
              <div className="flex w-full justify-between border-b">
                <p className="py-[14px] font-[400] text-[#5B5B5B]">
                  Student ID:
                </p>
                <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                  {item.studentId}
                </p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="py-[14px] font-[400] text-[#5B5B5B]">
                  Registration ID:
                </p>
                <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                  {item.registrationId}
                </p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="py-[14px] font-[400] text-[#5B5B5B]">
                  Creation Date:
                </p>
                <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                  {item.creationDate}
                </p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="py-[14px] font-[400] text-[#5B5B5B]">
                  Registration Status:
                </p>
                <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                  {item.registrationStatus}
                </p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="py-[14px] font-[400] text-[#5B5B5B]">
                  Admission Status:
                </p>
                <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                  {item.admissionStatus}
                </p>
              </div>
            </div>

            {item.registrationStatus === "Completed" &&
              item.admissionStatus === "Registered" && (
                <div className="flex w-full items-center justify-center gap-x-[16px]">
                  <div className="h-[44px] w-[44px] cursor-pointer">
                    <Image
                      className="h-full w-full object-cover"
                      src={visible}
                      alt="application"
                    />
                  </div>
                  <div className="h-[44px] w-[44px] cursor-pointer">
                    <Image
                      className="h-full w-full object-cover"
                      src={application}
                      alt="application"
                    />
                  </div>
                  <div className="h-[44px] w-[44px] cursor-pointer">
                    <Image
                      className="h-full w-full object-cover"
                      src={cancel}
                      alt="application"
                    />
                  </div>
                </div>
              )}

            {item.registrationStatus === "Incomplete" &&
              item.admissionStatus === "Admitted" && (
                <div className="flex w-full items-center justify-center gap-x-[16px]">
                  <Link
                    href={`/student-mgt/${item.studentId}`}
                    className="flex h-[48px] w-[159px] items-center justify-center rounded-[8px] bg-[#ED1000]"
                  >
                    <button className="font-[500] text-[#FCF9F9]">
                      View Details
                    </button>
                  </Link>
                </div>
              )}
          </div>
        ))}
      </div>

       {confirmAdmissionOpen && selectedStudent && (
                    <Warning 
                      alert
                      open={confirmAdmissionOpen}
                      onClose={handleCloseAdmissionModal}
                      description={`Are you sure you want to grant admission to ${selectedStudent?.name}?`}
                      onConfirm={()=> 
                        performStudentAction({
                          id: selectedStudent.id,
                          action: 'grant-admission',
                        })
                      }
                    />
                  )}
    </div>
  );
};

export default ApplicantGrid;

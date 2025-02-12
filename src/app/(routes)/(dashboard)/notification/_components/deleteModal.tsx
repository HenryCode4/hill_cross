// AddResult.tsx
import { warningIcon } from "@/assets";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from "next/image";
import React from "react";

interface DeleteClubTriggerProps {
    open?: boolean;
    onClose?: () => void;
    data?: any;
    onConfirm?: () => void;
    description?: string;
  }

const Warning = ({ open, onClose, data, onConfirm, description}: DeleteClubTriggerProps) => {
  
  return (
    <div className="flex justify-center items-center">
      <div className={`  `}>
        <AlertDialog open={open} onOpenChange={onClose}>
          <AlertDialogTrigger asChild>
            
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogHeader className="flex flex-row gap-x-[12px] items-start justify-start">
              <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#FFDFDF]">
                <Image alt="Warning icon" src={warningIcon} />
              </div>
              <div className="flex flex-col w-full flex-1">
                <AlertDialogTitle className="">Delete Notification</AlertDialogTitle>
                <AlertDialogDescription className="">
                    {description}
                </AlertDialogDescription>
              </div>
              
              
            </AlertDialogHeader>
            
            <AlertDialogFooter className="w-full flex justify-end gap-x-[12px]">
              <AlertDialogCancel onClick={onClose} className="w-[65px] h-[34px]">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm} className="w-[65px] h-[34px]">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Warning;

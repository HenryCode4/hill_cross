// AddResult.tsx
import { warningIcon } from "@/assets";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React from "react";
import SelectComponent from "./selectComponent";

interface DeleteClubTriggerProps {
    open: boolean;
    onClose: () => void;
    onChange?: (value: string) => void;
    data?: any;
    description: string;
    onConfirm: () => void;
  }

const Warning = ({ open, onClose, onChange = () => {}, data, description, onConfirm}: DeleteClubTriggerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`  `}>
        <AlertDialog open={open} onOpenChange={onClose}>
          <AlertDialogTrigger asChild>
            
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <div className="flex items-center justify-center w-full">
                <Image alt="Warning icon" src={warningIcon} />
              </div>
              <AlertDialogTitle className="text-center">Warning</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
              {description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel onClick={onClose} className="w-full h-[48px]">No</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm} className="w-full h-[48px]">Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Warning;

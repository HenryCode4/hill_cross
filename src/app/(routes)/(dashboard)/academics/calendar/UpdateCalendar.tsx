'use client'
import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date_pickerNew";
import DropdownSelect from "@/components/customDropdown";
import { useState } from "react";

interface UpdateQualificationTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateCalendar = ({
  open,
  onClose,
  event,
}: UpdateQualificationTriggerProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Edit Calendar</DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <div className=" flex flex-col px-6 gap-y-[24px]">
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Session  Name</Label>
                      <Input className="bg-[#F9FCFB] text-[#2D2D2D] border-[#AACEC9] px-4 py-2 border outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[48px]" placeholder="Name of session" />
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Semester</Label>
                      <DropdownSelect
                        label="Select a Fruit"
                        options={["Apple", "Banana", "Orange", "Grapes"]}
                        onChange={handleSelectChange}
                      />
                    
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Standard</Label>
                      <DropdownSelect
                        label="Select a Fruit"
                        options={["Apple", "Banana", "Orange", "Grapes"]}
                        onChange={handleSelectChange}
                      />
                      
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Start Date</Label>
                      <DatePicker />
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">End Date</Label>
                      <DatePicker />
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Course Reg start date</Label>
                      <DatePicker />
                    </div>
          
                    <div className="flex flex-col gap-y-[8px]">
                      <Label className="text-[#1E1E1E] font-[600]">Course Reg end date</Label>
                      <DatePicker />
                    </div>
          
                   
          
                  </div>
          <DialogFooter className="px-6">
            <div className="flex w-full items-center justify-center">
              <Button className="h-[40px] w-[205px]" type="submit">
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCalendar;

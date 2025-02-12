
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
import { Textarea } from "@/components/ui/textarea";
import { schools } from "@/lib/constants";

interface UpdateQualificationTriggerProps {
    open: boolean;
    onClose: () => void;
    event?: any;
  }
const UpdateSchool = ({ open, onClose, event }: UpdateQualificationTriggerProps) => {


  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Edit Module</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className=" flex flex-col px-6 gap-y-[24px]">
          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Module  Name</Label>
            <Input className="outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[48px]" placeholder="Name of module" />
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Qualification</Label>
            <SelectComponent items={schools} placeholder="Select qualification" />
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Semester (Optional)</Label>
            <SelectComponent items={schools} placeholder="Select semester" />
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Standard</Label>
            <SelectComponent items={schools} placeholder="Select standard" />
          </div>
          </div>
        <DialogFooter className="px-6 ">
          <div className="w-full flex justify-center items-center">
            <Button className="w-[205px] h-[40px]" type="submit">Save Changes</Button>
          </div>
          
        </DialogFooter>
      </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateSchool;

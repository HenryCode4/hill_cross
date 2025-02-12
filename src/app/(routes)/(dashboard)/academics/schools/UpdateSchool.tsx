
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

interface UpdateSchoolTriggerProps {
    open: boolean;
    onClose: () => void;
    event?: any;
  }
const UpdateSchool = ({ open, onClose, event }: UpdateSchoolTriggerProps) => {


  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Edit school</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className=" flex flex-col px-6 gap-y-[24px]">
          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">School Name</Label>
            <Input className="outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[48px]" placeholder="Name of school" />
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Description</Label>
            <Textarea className="outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[189px]" placeholder="Description of the school." />
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

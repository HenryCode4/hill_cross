import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const SemesterTrigger = () => {
  return (
    <Dialog>
              <DialogTrigger asChild>
                <Button className=" bg-[#ED1000] header-button font-[500]">
                  Add new semester
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                  <DialogTitle>Add New Semester</DialogTitle>
                  {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
                </DialogHeader>
                <div className="flex flex-col gap-y-[24px] px-6">
                  <div className="flex flex-col gap-y-[8px]">
                    <Label className="font-[600] text-[#1E1E1E]">
                      Semester Name
                    </Label>
                    <Input
                      className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                      placeholder="Name of Semester"
                    />
                  </div>

                </div>
                <DialogFooter className="px-6">
                  <div className="flex w-full items-center justify-center">
                    <Button className="h-[40px] w-[205px]" type="submit">
                    Create Semester
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
  )
}

export default SemesterTrigger
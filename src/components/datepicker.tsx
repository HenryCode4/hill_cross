"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import { calendar, clock1, redDown } from "@/assets"

interface DatePickerDemoProps {
  className?: string;
  selectTime?: boolean;
  placeholder?: string;
  date?: string;
  setDate?: (date: string | undefined) => void;
}

export function DatePickerDemo({ className, selectTime, placeholder, date,
  setDate  }: DatePickerDemoProps) {
    const [open, setOpen] = React.useState(false);

    // Convert string date to Date object for the Calendar
    const dateValue = date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;

    const handleDateSelect = (selectedDate: Date | undefined) => {
      if (setDate) {
        // Convert Date back to string in yyyy-MM-dd format
        setDate(selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined);
      }
      setOpen(false);
    };
  
    // const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const selectedTime = event.target.value;
    //   // For time only, keep the current date or use today
    //   const currentDate = date ? parse(date, "yyyy-MM-dd", new Date()) : new Date();
    //   const [hours, minutes, seconds] = selectedTime.split(":").map(Number);
    //   currentDate.setHours(hours, minutes, seconds);
      
    //   setDate?.(format(currentDate, "yyyy-MM-dd"));
    //   setOpen(false);
    // };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const [hours, minutes] = event.target.value.split(":");
    
      // Format as "HH:MM" (leading zeros if needed)
      const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    
      setDate?.(formattedTime);
      setOpen(false);
    };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            [
              "w-full h-[57px] justify-between text-left font-normal border border-[#CEAAAA]",
              !date && "text-muted-foreground",
              className
            ]
          )}
        >
          {date ? (selectTime ? date : date) : <span>{placeholder || (selectTime ? "Select time" : "Select date")}</span>}
          {
            selectTime ? (<Image src={clock1} alt="down icon" />) : (<Image src={calendar} alt="down icon" />)
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        {selectTime ? (
          <input
            type="time"
            step="1" // Allows selection of seconds
            onChange={handleTimeChange}
            className="w-full p-2 border rounded"
          />
        ) : (
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
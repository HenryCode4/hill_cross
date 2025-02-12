"use client"

import * as React from "react"
import { format } from "date-fns"
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
}

export function DatePickerDemo({ className, selectTime, placeholder }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date>()

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value
    const [hours, minutes, seconds] = selectedTime.split(":").map(Number)
    const newDate = new Date()
    newDate.setHours(hours, minutes, seconds)
    setDate(newDate)
  }

  return (
    <Popover>
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
          {date ? (selectTime ? format(date, "HH:mm:ss") : format(date, "PPP")) : <span>{placeholder || (selectTime ? "Select time" : "Select date")}</span>}
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
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
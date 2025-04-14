"use client"

import { calenderIcon } from "@/assets"
import Image from "next/image"
import * as React from "react"

interface DatePickerProps {
  onChange?: (date: string) => void;
  value?: string;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  const [date, setDate] = React.useState<string>(value || "")
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear())
  const [dropdownPosition, setDropdownPosition] = React.useState<'top' | 'bottom'>('bottom')

  const calendarRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLDivElement>(null)

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day)
    const formattedDate = selectedDate.toISOString().split("T")[0]
    setDate(formattedDate)
    onChange?.(formattedDate)
    setShowCalendar(false)
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value))
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowCalendar(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className="cursor-pointer p-2 hover:bg-gray-200"
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      )
    }

    return (
      <div
        className={`absolute w-full bg-[#F9FCFB] text-[#2D2D2D] border border-[#AACEC9] rounded-[8px] shadow-lg p-4 z-[9999] mt-2 ${dropdownPosition === 'top' ? 'bottom-full' : 'top-full'}`}
        ref={calendarRef}
      >
        <div className="flex justify-between mb-4">
          <select value={selectedMonth} onChange={handleMonthChange} className="border p-1 rounded">
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} className="border p-1 rounded max-h-[70px] overflow-y-auto">
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - 50 + i}>
                {new Date().getFullYear() - 50 + i}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    )
  }

  const handleInputClick = () => {
    if (inputRef.current && calendarRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const calendarHeight = calendarRef.current.offsetHeight

      // Calculate available space above and below the input field
      const spaceBelow = windowHeight - rect.bottom
      const spaceAbove = rect.top

      // Check if there's enough space below, if not, position the calendar above
      if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
        setDropdownPosition('top')  // Position calendar above if no space below
      } else {
        setDropdownPosition('bottom')  // Position calendar below if enough space
      }
    }

    setShowCalendar(!showCalendar)
  }

  return (
    <div className="relative w-full h-[35px] md:h-[48px]">
      <div
        ref={inputRef}
        className="text-[16px] cursor-pointer bg-[#F9FCFB] text-[#2D2D2D] border-[#AACEC9] rounded-[8px] w-full h-full px-4 py-2 border flex items-center justify-between"
        onClick={handleInputClick}
      >
        <span>{date ? date : "DD/MM/YYYY"}</span>
        <Image src={calenderIcon} alt={"calender icon"} />
      </div>
      {showCalendar && renderCalendar()}
    </div>
  )
}

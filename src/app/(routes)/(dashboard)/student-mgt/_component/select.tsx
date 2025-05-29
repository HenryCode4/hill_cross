import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface selectProps {
    data: string[];
    placeholder: string;
    title?: string;
    required?: string
    onChange?: (value: string) => void;
    defaultValue?: string;
    value?: string;
    academic?: boolean;
}

const SelectPage = ({data, placeholder, title, required, onChange, defaultValue , value, academic}: selectProps) => {
    
  return (
    <div>
    <div className="flex flex-col gap-y-[8px]">
      <label className="text-[16px] font-[600]">
        {title} <span className="text-[#930C02]">{required}</span>
      </label>

      <Select onValueChange={onChange} defaultValue={defaultValue} value={value}>
        <div className="h-full w-full rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
          <SelectTrigger className="h-[43px] w-full bg-transparent outline-none">
            <SelectValue
              className={`${academic ? "border-[#AACEC9]" : "border-[#CEAAAA]"}w-full border bg-[#FCF9F9] text-[1rem] text-[#696A6A] outline-none`}
              placeholder={placeholder}
            />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectGroup>
            {data.map((item) => (
              <SelectItem key={item} value={item.toLowerCase()}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
  )
}

export default SelectPage
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface selectProps {
    data: {label:string,key:string}[];
    placeholder: string;
    title?: string;
    required?: string
    onChange?: (value: {label:string,key:string}) => void;
    defaultValue?: string;
    value?: string;
}

const SelectPage2 = ({data, placeholder, title, required, onChange, defaultValue , value}: selectProps) => {

    const handleValueChange = (selected: string) => {
        const selectedItem = data.find(
            (item) => item.label.toLowerCase() === selected
        );
        if (selectedItem && onChange) {
            onChange(selectedItem);
        }
    };

  return (
    <div>
    <div className="flex flex-col gap-y-[8px]">
      <label className="text-[16px] font-[600]">
        {title} <span className="text-[#930C02]">{required}</span>
      </label>

      <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
        <div className="h-full w-full rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
          <SelectTrigger className="h-[43px] w-full bg-transparent outline-none">
            <SelectValue
              className="w-full border border-[#CEAAAA] bg-[#FCF9F9] text-[1rem] text-[#696A6A] outline-none"
              placeholder={placeholder}
            />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectGroup>
            {data.map((item) => (
              <SelectItem key={item.key} value={item.label.toLowerCase() || item.key}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
  )
}

export default SelectPage2
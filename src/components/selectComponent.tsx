import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface selectComponentProps {
    placeholder: string;
    items: string[];
    onChange?: (value: string) => void;
    border?: boolean;
    className?: string;
}

const SelectComponent = ({placeholder, items, onChange, border, className}: selectComponentProps) => {
  return (
    <div className={`${border && ("border rounded-[8px]")} relative z-[99]`}>
        <Select onValueChange={onChange}>
                <SelectTrigger  className={cn("w-full h-[43px]", className)}>
                  <SelectValue className='text-[#696A6A] text-[1rem] outline-none focus:outline-none' placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        items.map((item) => (
                            <SelectItem className='hover:bg-[#F8F8F8]' key={item} value={item.toLowerCase()}>{item}</SelectItem>
                        ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
    </div>
  )
}

export default SelectComponent
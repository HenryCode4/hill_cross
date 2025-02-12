import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';
import { sort } from '@/assets';

interface selectComponentProps {
    placeholder: string;
    items: string[];
    onChange?: (value: string) => void;
    border?: boolean;
}

const SortComponent = ({placeholder, items, onChange, border}: selectComponentProps) => {
  return (
    <div className={`w-full relative z-[99] flex justify-center items-center`}>
        <Select onValueChange={onChange}>
                <SelectTrigger hideDropdown  className="w-full h-[43px] flex gap-x-[6px]">
                  <SelectValue className='text-[#696A6A] text-[1rem] outline-none focus:outline-none' placeholder={placeholder} />
                  <Image src={sort} alt='sort icon' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        items.map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>
                        ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
    </div>
  )
}

export default SortComponent
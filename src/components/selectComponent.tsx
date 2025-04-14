import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface Items {
  id: string;
  label: string;
}

interface selectComponentProps {
    placeholder: string;
    items: Items[] | string[];  // Allow either array type
    onChange?: (value: string) => void;
    border?: boolean;
    className?: string;
}

const SelectComponent = ({placeholder, items = [], onChange, border, className}: selectComponentProps) => {
  // Helper function to handle both types of items
  const renderItem = (item: Items | string) => {
    if (typeof item === 'string') {
      return {
        id: item,
        label: item,
        value: item
      }
    }
    return {
      id: item.id,
      label: item.label,
      value: item.id
    }
  }

  return (
    <div className={`${border && ("border rounded-[8px]")} relative z-[99] w-full`}>
        <Select  onValueChange={onChange}>
                <SelectTrigger className={cn("w-full h-[43px]", className)}>
                  <SelectValue 
                    className='text-[#696A6A] text-[1rem] outline-none focus:outline-none' 
                    placeholder={placeholder} 
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => {
                      const renderedItem = renderItem(item);
                      return (
                        <SelectItem 
                          className='hover:bg-[#F8F8F8]' 
                          key={renderedItem.id} 
                          value={renderedItem.value}
                        >
                          {renderedItem.label}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
    </div>
  )
}

export default SelectComponent
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
    full?: boolean;
}

const SelectComponent = ({placeholder, items = [], onChange, border, className, full}: selectComponentProps) => {
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
    
      <div className={cn(
      "relative z-[99]",
      border && "border rounded-[8px]",
      !full && "w-full"
    )}>
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
                          className='hover:bg-[#F8F8F8] max-w-[400px]' 
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
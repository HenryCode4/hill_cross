import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface Items {
  id: string;
  label: string;
}

interface MultiSelectProps {
  placeholder: string;
  items: Items[] | string[];
  onChange?: (values: string[]) => void;
  border?: boolean;
  className?: string;
}

const MultiSelectComponent = ({
  placeholder,
  items = [],
  onChange,
  border,
  className
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

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
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className={cn("w-full h-[43px]", className)}>
          <SelectValue 
            className='text-[#696A6A] text-[1rem] outline-none focus:outline-none' 
            placeholder={
              selectedValues.length 
                ? `${selectedValues.length} selected`
                : placeholder
            } 
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => {
              const renderedItem = renderItem(item);
              return (
                <SelectItem 
                  className={cn(
                    'hover:bg-[#F8F8F8]',
                    selectedValues.includes(renderedItem.value) && 'bg-[#F0F0F0]'
                  )}
                  key={renderedItem.id} 
                  value={renderedItem.value}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={cn(
                      'flex-shrink-0 w-4 h-4 border rounded flex items-center justify-center',
                      selectedValues.includes(renderedItem.value) && 'bg-primary border-primary'
                    )}>
                      {selectedValues.includes(renderedItem.value) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="truncate max-w-[150px] xl:max-w-full">{renderedItem.label}</span>
                  </div>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default MultiSelectComponent
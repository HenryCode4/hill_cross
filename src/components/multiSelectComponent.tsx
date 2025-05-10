import React from "react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
}

interface CustomMultiSelectProps {
  placeholder: string;
  items: Item[];
  value: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

const CustomMultiSelectComponent = ({
  placeholder,
  items,
  value,
  onChange,
  className,
}: CustomMultiSelectProps) => {
  const toggleItem = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeItem = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const selectedLabels = items?.filter((i) => value.includes(i.id));

  return (
    <div className={cn("relative w-full", className)}>
      {/* Dropdown Trigger Button */}
      <details className="w-full rounded border border-[#AACEC9] bg-white">
        <summary className="cursor-pointer px-4 py-2 select-none flex justify-between items-center">
          <span className="text-[#696A6A]">
            {value.length > 0 ? `${value.length} selected` : placeholder}
          </span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        {/* Dropdown Options */}
        <div className="max-h-[200px] overflow-y-auto border-t">
          {items?.map((item) => {
            const checked = value.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 border rounded flex items-center justify-center mr-2",
                    checked && "bg-primary border-primary text-white"
                  )}
                >
                  {checked && <span className="text-xs">✓</span>}
                </div>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </details>

      {/* Selected Tags */}
      {selectedLabels?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedLabels?.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm"
            >
              <span className="mr-1">{item.label}</span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelectComponent;

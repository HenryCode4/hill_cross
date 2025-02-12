import { dropdown2 } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";

interface DropdownSelectProps {
  options: string[];
  label: string;
  onChange: (value: string) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, label, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Select an option
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option); // Notify the parent component of the change
    setIsOpen(false); // Close the dropdown after selection
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-select")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative dropdown-select w-full h-[35px] md:h-[48px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]">
      
      {/* Select Trigger */}
      <div className="flex w-full h-full justify-between items-center ">
        <button
        className="w-full px-4 text-left text-[#2D2D2D] text-[14px] "
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : "Select an option"}
      </button>

      <Image className="h-[20px]" src={dropdown2} alt="dropdown icon"/>
      </div>
      

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;

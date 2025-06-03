import React from "react";

interface SelectListProps {
  items: string[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

const SelectList: React.FC<SelectListProps> = ({
  items,
  selected,
  onSelect,
  className,
}) => {
  return (
    <div className={`absolute flex flex-col gap-4 ${className}`}>
      {items.map(item => (
        <button
          key={item}
          className={`
            px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer
            ${selected === item ? "bg-blue-500 text-white" : "bg-gray-200"}
            focus:outline-none
          `}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SelectList;

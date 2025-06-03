import React from "react";

interface AutocompleteProps {
  value: string;
  options: string[];
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const Autocomplete = ({
  value,
  options,
  placeholder,
  className,
  onChange,
  onSelect,
}: AutocompleteProps) => {
  return (
    <div
      className={`absolute top-17 left-0 z-30 bg-white rounded-xl shadow-lg p-4 w-72 ${
        className || ""
      }`}
    >
      <input
        type="text"
        className="w-full border px-2 py-1 mb-1  rounded-xl"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoFocus
      />
      <ul>
        {options
          .filter(d => d.toLowerCase().includes(value.toLowerCase()))
          .map(d => (
            <li
              key={d}
              className="cursor-pointer hover:bg-blue-100 p-2 rounded text-sm"
              onClick={() => onSelect(d)}
            >
              {d}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;

import React from 'react';

interface SortOption {
  value: string;
  label: string;
}

interface SortOptionsProps {
  options: SortOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-green-800 font-medium">Sort by:</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="bg-green-50 border border-green-300 text-green-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
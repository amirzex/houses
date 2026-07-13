import React from 'react';

interface NumberInputProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    name: string;
    placeholder?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
    label,
    value,
    onChange,
    name,
    placeholder = "مقدار"
}) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <label className="text-xs font-bold text-gray-800 px-2 dark:text-[#D9D9E0]">
                {label}
            </label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-100/80 text-gray-500 dark:text-[#D9D9E0] dark:bg-[#353535] text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#1a3b99]/20 transition-all placeholder:text-gray-400"
            />
        </div>
    );
};

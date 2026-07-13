'use client'
import { DropDownProps } from '@/core/types/IDropdown'
import React, { useState } from 'react'

const Dropdown = ({ options, value, onChange }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const selectedLabel =
        options.find((opt) => opt.value === value)?.label || "انتخاب کنید"

    return (
        <div className="relative w-full">
            <button
                type="button"
                className="p-3 w-full bg-gray-100 rounded-4xl flex flex-row-reverse justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedLabel}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-full bg-gray-100 rounded-lg shadow-lg z-50">
                    <ul>
                        {options.map((opt) => (
                            <li key={opt.value}>
                                <button
                                    className="block w-full px-4 py-2 text-right hover:bg-gray-200"
                                    onClick={() => {
                                        onChange(opt.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Dropdown
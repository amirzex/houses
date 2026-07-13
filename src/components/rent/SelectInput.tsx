export const SelectInput = ({ label, placeholder, value, onChange, options = [] }: any) => (
    <div className="flex flex-col gap-3 w-full">
        <label className="text-xs font-bold text-gray-800 px-2 dark:text-[#D9D9E0]">{label}</label>

        <div className="relative w-full">
            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-100/80 text-gray-500 dark:text-[#D9D9E0] dark:bg-[#353535] text-sm rounded-full px-4 py-3 appearance-none outline-none focus:ring-2 focus:ring-[#1a3b99]/20 cursor-pointer transition-all"
            >
                <option value="">{placeholder}</option>

                {options.map((item: any) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}

            </select>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
    </div>
);

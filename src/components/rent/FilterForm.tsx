import React from "react";
import { SelectInput } from "./SelectInput";
interface NumberInputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (name: string, value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, value, onChange }) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <label className="text-xs font-bold text-gray-800 px-2 dark:text-[#D9D9E0]">
                {label}
            </label>
            <input
                type="number"
                value={value || ""} 
                onChange={(e) => onChange(name, e.target.value)} 
                placeholder="مقدار"
                className="w-full bg-gray-100/80 text-gray-500 dark:text-[#D9D9E0] dark:bg-[#353535] text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-brand/20"
            />
        </div>
    );
};


const FilterForm = ({ filters, setFilters }: any) => {
    const handleChange = (name: string, value: any) => {
        setFilters((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form className="w-full flex flex-col gap-6" onSubmit={e => e.preventDefault()} dir='rtl'>
            {/* first */}
            <div className="w-full flex flex-row max-sm:flex-col justify-center items-center gap-4 ">
                <div className="flex flex-col gap-3 w-[25%] max-sm:w-full ">
                    <label className="text-xs font-bold text-gray-800 px-2 dark:text-[#D9D9E0]">جستجو</label>
                    <input
                        type="text"
                        value={filters?.search || ""}
                        onChange={(e) => handleChange("search", e.target.value)}
                        placeholder="نام محل مورد نظر ..."
                        className="w-full bg-gray-100/80 text-gray-500 dark:text-[#D9D9E0] dark:bg-[#353535] text-sm rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className='w-[75%] flex flex-row max-sm:flex-col max-sm:w-full justify-center gap-5 items-center'>
                    <SelectInput label="مرتب سازی" value={filters?.sort} onChange={(v: any) => handleChange("sort", v)} options={[{ label: "جدیدترین", value: "last_updated" }, { label: "قدیمی ترین", value: "created_at" }]} />
                    <SelectInput label="محل" value={filters?.location} onChange={(v: any) => handleChange("location", v)} options={[{ label: "بابل", value: "بابل" }, { label: "ساری", value: "ساری" },{ label: "بابلسر", value: "بابلسر" },{ label: "رامسر", value: "رامسر" },{ label: "نور", value: "نور" }]} />
                    <SelectInput label="نوع ملک" value={filters?.propertyType} onChange={(v: any) => handleChange("propertyType", v)} options={[{ label: "آپارتمان", value: "apartment" }, { label: "ویلا", value: "villa" }]} />
                    <SelectInput label="نوع معامله" value={filters?.transactionType} onChange={(v: any) => handleChange("transactionType", v)} options={[{ label: "اجاره", value: "rental" }, { label: "رزرو", value: "reservation" }]} />
                </div>
            </div>

            <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-4 px-20 max-sm:px-0">
                <NumberInput label="حداقل قیمت" name="minPrice" value={filters?.minPrice} onChange={handleChange} />
                <NumberInput label="حداکثر قیمت" name="maxPrice" value={filters?.maxPrice} onChange={handleChange} />
                <NumberInput label="حداقل اجاره" name="minRent" value={filters?.minRent} onChange={handleChange} />
                <NumberInput label="حداکثر اجاره" name="maxRent" value={filters?.maxRent} onChange={handleChange} />
                <NumberInput label="حداقل رهن" name="minMortgage" value={filters?.minMortgage} onChange={handleChange} />
                <NumberInput label="حداکثر رهن" name="maxMortgage" value={filters?.maxMortgage} onChange={handleChange} />
                <NumberInput label="حداقل متراژ" name="minArea" value={filters?.minArea} onChange={handleChange} />
                <NumberInput label="حداکثر متراژ" name="maxArea" value={filters?.maxArea} onChange={handleChange} />
            </div>
        </form>
    );
};

export default FilterForm;

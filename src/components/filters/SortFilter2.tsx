"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Dropdown from "../common/Dropdown"

interface IProps {
    currentSort: string;
    onChange?: (value: string) => void;
};

const sortOptions = [
    { label: "مازندران", value: "mazandran" },
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "esfahan" },
    { label: "گیلان", value: "gilan" },
    { label: "شیراز", value: "shiraz" },
    { label: "کیش", value: "kish" },
]

const SortFilter2 = ({ currentSort, onChange }: IProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSortChange = (value: string) => {

        if (onChange) {
            onChange(value);
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`?${params.toString()}`);
    };

    return (
        <Dropdown
            options={sortOptions}
            value={currentSort}
            onChange={handleSortChange}
        />
    )
}

export default SortFilter2
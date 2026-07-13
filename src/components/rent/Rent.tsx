"use client";
import React from "react";
import Card from "../common/Card";
import Breadcrumb from "../common/Breadcrumb";
import FilterWithMobileMenu from "./FilterWithMobileMenu";
import { useRentQuery } from "@/core/api/landing/queries";
import FilterForm from "./FilterForm";
import { useDebounce } from "@/hooks/use-debounce";

const Rent = () => {

    // Rent.tsx
    const [filters, setFilters] = React.useState({
        limit: 10,
        transactionType: "rental",
        order: "DESC",
        sort: "last_updated",
        search: "",
        location: "",
        propertyType: "",
        minPrice: "",
        maxPrice: "",
        minRent: "",
        maxRent: "",
        minMortgage: "",
        maxMortgage: "",
        minArea: "",
        maxArea: "",
    });


    const cleanFilters = (obj: any) => {
        return Object.fromEntries(
            Object.entries(obj).filter(
                ([_, v]) => v !== "" && v !== undefined && v !== null
            )
        );
    };

    const debouncedFilters = useDebounce(filters, 700);

    const { data, isLoading, error } = useRentQuery(
        cleanFilters(debouncedFilters)
    );

    if (isLoading) {
        return <div className="text-center mt-10">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="text-center mt-10">خطا در دریافت اطلاعات</div>;
    }

    return (
        <div className="flex flex-col w-full font-sans text-gray-800" dir="rtl">
            <Breadcrumb />

            <div className="px-10 max-sm:px-5 max-sm:mb-0 w-full mb-4">
                <div className="max-sm:hidden md:block">
                    <FilterForm filters={filters} setFilters={setFilters} />
                </div>

                <div className="max-sm:block md:hidden">
                    <FilterWithMobileMenu filters={filters} setFilters={setFilters}/>
                </div>
            </div>

            <div
                className="flex flex-row max-sm:flex-col justify-center p-10 items-center flex-wrap gap-6 max-sm:p-5"
                dir="ltr"
            >
                {data?.map((item, index) => (
                    <Card value={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Rent;

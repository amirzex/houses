"use client";

import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import LocationMap from "../common/Map";
import FilterForm from "../rent/FilterForm";
import FastCard from "../common/FastCard";
import FilterWithMobileMenu from "../rent/FilterWithMobileMenu";
import Card from "../common/Card";
import { useRentQuery } from "@/core/api/landing/queries";
import { useDebounce } from "@/hooks/use-debounce";

const FastReserve = () => {
    const [filters, setFilters] = React.useState({
        limit: 10,
        transactionType: "reservation",
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
        <div
            className="flex flex-col justify-center items-center mt-30"
            dir="rtl"
        >
            <Breadcrumb />

            {/* filter div */}
            <div className="w-full p-10 mb-10 max-sm:p-5 max-sm:mb-0 mt-5">
                {/* desktop */}
                <div className="max-sm:hidden md:block">
                    <FilterForm filters={filters} setFilters={setFilters} />
                </div>

                {/* mobile */}
                <div className="max-sm:block md:hidden">
                    <FilterWithMobileMenu filters={filters} setFilters={setFilters} />
                </div>
            </div>

            <div className="w-full flex flex-row max-sm:flex-col-reverse justify-center items-start gap-5 max-sm:gap-0">

                {/* desktop cards */}
                <div className="w-[60%] max-sm:hidden md:flex flex-col justify-start items-center gap-5 pr-10 h-auto overflow-y-auto">
                    {data?.map((item, index) => (
                        <FastCard item={item} key={index} />
                    ))}
                </div>

                {/* mobile cards */}
                <div className="w-full max-sm:flex md:hidden flex-col justify-start items-center gap-5 pr-5 pl-5" dir="ltr">
                    {data?.map((item, index) => (
                        <Card value={item} detailPath="fast-reserve" key={index} />
                    ))}
                </div>

                {/* map */}
                <div className="w-[40%] max-sm:mt-5  max-sm:pl-5 max-sm:pr-5 max-sm:h-auto  max-sm:w-full pl-10">
                    <LocationMap />
                </div>
            </div>
        </div>
    );
};

export default FastReserve;

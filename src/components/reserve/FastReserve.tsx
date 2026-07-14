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
            className="page-top flex w-full min-w-0 flex-col items-center justify-center"
            dir="rtl"
        >
            <Breadcrumb />

            <div className="section-wrap mb-6 mt-5 w-full">
                <div className="hidden md:block">
                    <FilterForm filters={filters} setFilters={setFilters} />
                </div>

                <div className="md:hidden">
                    <FilterWithMobileMenu filters={filters} setFilters={setFilters} />
                </div>
            </div>

            <div className="section-wrap flex w-full flex-col gap-6 pb-8 md:flex-row md:items-start md:gap-8">

                <div className="hidden w-full flex-col items-stretch gap-5 md:flex md:w-[58%] md:pr-4">
                    {data?.map((item, index) => (
                        <FastCard item={item} key={index} />
                    ))}
                </div>

                <div className="flex w-full flex-col items-stretch gap-5 md:hidden" dir="ltr">
                    {data?.map((item, index) => (
                        <Card value={item} detailPath="fast-reserve" key={index} />
                    ))}
                </div>

                <div className="w-full md:w-[42%] md:pl-4">
                    <LocationMap />
                </div>
            </div>
        </div>
    );
};

export default FastReserve;

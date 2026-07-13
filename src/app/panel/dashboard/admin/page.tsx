"use client";
import { useAdminHouses, useAdminInfo } from "@/core/api/admin/dashboard/queries";
import React from "react";
import AdminStats from "@/components/panel/dashboard/admin/AdminStats";
import AdminHouseTable from "@/components/panel/dashboard/admin/AdminHouseTable";
import DashboardChart from "@/components/panel/dashboard/admin/DashboardChart";
import AdminIncomeCard from "@/components/panel/dashboard/admin/AdminIncomeCard";


export default function AdminDashboardPage() {
    const { data: info, } = useAdminInfo();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/*  status */}
            <AdminStats info={info} />

            <div className="grid lg:grid-cols-3 gap-8">
                {/*  houses table */}
                <AdminHouseTable />

                {/* chart */}

                <DashboardChart info={info} />

                <div className="bg-primary dark:bg-[#353535] text-white rounded-[32px] p-8 border-2 border-[#272727] flex flex-col justify-between">
                    <AdminIncomeCard />
                </div>
            </div>
        </div>
    );
}

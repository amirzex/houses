"use client";
import { useAdminInfo } from "@/core/api/admin/dashboard/queries";
import React from "react";
import AdminStats from "@/components/panel/dashboard/admin/AdminStats";
import AdminHouseTable from "@/components/panel/dashboard/admin/AdminHouseTable";
import DashboardChart from "@/components/panel/dashboard/admin/DashboardChart";
import AdminIncomeCard from "@/components/panel/dashboard/admin/AdminIncomeCard";

export default function AdminDashboardPage() {
  const { data: info } = useAdminInfo();

  return (
    <div className="panel-page">
      <AdminStats info={info} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <AdminHouseTable />
        <DashboardChart info={info} />
        <div className="panel-cta-card">
          <AdminIncomeCard />
        </div>
      </div>
    </div>
  );
}

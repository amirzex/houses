"use client";
import Header from "@/components/layout/dashboard/Header";
import MobileNav from "@/components/layout/dashboard/MobileNav";
import Sidebar from "@/components/layout/dashboard/Sidebar";

import React from "react";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="panel-shell" dir="rtl">
      <aside className="panel-sidebar">
        <Sidebar />
      </aside>

      <div className="panel-main">
        <main className="panel-main-inner">
          <div className="w-full min-w-0 animate-in fade-in duration-500">
            <div className="mb-3 flex w-full min-w-0 flex-row items-center sm:mb-4">
              <Header />
            </div>
            {children}
          </div>
        </main>
      </div>

      <div className="panel-mobile-nav">
        <MobileNav />
      </div>
    </div>
  );
}

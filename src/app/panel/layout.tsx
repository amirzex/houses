"use client";
import Header from '@/components/layout/dashboard/Header';
import MobileNav from '@/components/layout/dashboard/MobileNav';
import Sidebar from '@/components/layout/dashboard/Sidebar';


import React from 'react';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-transparent dark:bg-transparent flex flex-row pt-10" dir="rtl">

      {/* Sidebar - Desktop */}
      <aside className=" w-[20%] border-2  rounded-l-2xl flex-col bg-white dark:bg-[#1E1E1E] border-l border-gray-100 dark:border-white/5">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="w-[80%] ">
        {/* <Header /> */}

        <main className="p-5 mt-[-40px] h-200">
          <div className="  w-full animate-in fade-in duration-700">
            <div className='w-full flex flex-row jus items-center '>
              <Header />
            </div>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-4 py-2">
        <MobileNav />
      </div>
    </div>
  );
}

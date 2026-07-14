"use client";
import Header from '@/components/layout/dashboard/Header';
import MobileNav from '@/components/layout/dashboard/MobileNav';
import Sidebar from '@/components/layout/dashboard/Sidebar';


import React from 'react';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-row overflow-x-hidden bg-surface pt-4 dark:bg-transparent xl:pt-6" dir="rtl">

      <aside className="hidden w-[200px] shrink-0 flex-col rounded-l-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)] dark:border-white/5 dark:bg-[#1a222d] xl:flex xl:w-[240px] 2xl:w-[280px]">
        <Sidebar />
      </aside>

      <div className="min-w-0 flex-1 pb-20 xl:pb-0">
        <main className="p-3 sm:p-4 xl:p-5">
          <div className="w-full min-w-0 animate-in fade-in duration-700">
            <div className='mb-3 flex w-full min-w-0 flex-row items-center xl:mb-4'>
              <Header />
            </div>
            {children}
          </div>
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border/60 bg-card/85 px-4 py-2 backdrop-blur-xl dark:border-white/5 dark:bg-black/80 xl:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

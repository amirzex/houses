"use client";

import React, { useState } from "react";
import { getNotificationColumns } from "@/components/panel/notifications/Columns";
import { DataTable } from "@/components/panel/comments/DataTable";


const notificationsData = [
  { id: 1, title: "رزرو جدید", description: "کاربر جدید اقامتگاه شما را رزرو کرد.", time: "2 دقیقه پیش", isRead: false },
  { id: 2, title: "پیام جدید", description: "یک پیام جدید از طرف مهمان دریافت کردید.", time: "10 دقیقه پیش", isRead: false },
  { id: 3, title: "پرداخت موفق", description: "پرداخت رزرو با موفقیت انجام شد.", time: "1 ساعت پیش", isRead: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const columns = getNotificationColumns(removeNotification, markAsRead);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-xl font-black text-slate-800 dark:text-white">اعلان‌های شما</h1>
      <DataTable
        columns={columns}
        data={notifications}
        emptyMessage="اعلانی وجود ندارد"
      />
    </div>
  );
};

export default Notifications;

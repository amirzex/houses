"use client";

import { useState, useRef } from "react";
import { CheckCheck, Paperclip, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { useDeleteChat, useUpdateChat } from "@/core/api/admin/chat/queries"; // فرض بر این است که هوک آپدیت هم در همین مسیر است

type Message = {
    id: string | number;
    senderId: string | number;
    message: string;
    files?: any | null;
    createdAt?: string | null;
    sender: {
        id: string | number;
        fullName: string;
        email: string;
    };
};

export const ChatMessages = ({
    chatHistory,
    isLoadingHistory,
    scrollRef,
    roomId,
}: {
    chatHistory: Message[] | undefined;
    isLoadingHistory: boolean;
    scrollRef: React.RefObject<HTMLDivElement>;
    roomId: string;
}) => {
    
    const ADMIN_ID = 175;

    const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // هوک‌های عملیاتی
    const { mutate: deleteMessage } = useDeleteChat(roomId);
    const { mutate: updateMessage } = useUpdateChat(roomId);

    const toggleMenu = (msgId: string | number) => {
        setActiveMenuId((prev) => (prev === msgId ? null : msgId));
    };

    // تابع مدیریت ویرایش
    const handleEdit = (msg: Message) => {
        const newText = prompt("ویرایش پیام:", msg.message); // می‌توانید این را با یک Modal شیک جایگزین کنید
        if (newText !== null && newText.trim() !== "" && newText !== msg.message) {
            updateMessage({ id: Number(msg.id), body: newText });
        }
        setActiveMenuId(null);
    };

    return (
        <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-fixed p-4 pb-28 md:p-8 md:pb-8"
        >
            {isLoadingHistory ? (
                <div className="flex justify-center mt-10">
                    <span className="bg-black/20 text-white px-4 py-1 rounded-full text-xs backdrop-blur-sm">
                        در حال بارگذاری...
                    </span>
                </div>
            ) : (
                chatHistory?.map((msg) => {
                    const isMessageFromAdmin = String(msg.senderId) === String(ADMIN_ID);
                    const isMenuActive = activeMenuId === msg.id;

                    return (
                        <div
                            key={msg.id}
                            className={`flex w-full items-center gap-2 group animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMessageFromAdmin ? "justify-end" : "justify-start"}`}
                        >
                            {/* منوی عملیات برای پیام‌های سمت راست (ادمین) */}
                            {isMessageFromAdmin && (
                                <div className="relative order-1">
                                    <button
                                        onClick={() => toggleMenu(msg.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:bg-black/5 rounded-full"
                                    >
                                        <MoreVertical size={16} />
                                    </button>

                                    {isMenuActive && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 bottom-7 z-50 bg-white shadow-lg border border-gray-200 rounded-lg py-1 w-28 animate-in fade-in zoom-in duration-150"
                                        >
                                            <button
                                                onClick={() => {
                                                    deleteMessage(Number(msg.id));
                                                    setActiveMenuId(null);
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 text-right"
                                            >
                                                <Trash2 size={12} />
                                                حذف
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(msg)}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-right"
                                            >
                                                <Edit2 size={12} />
                                                ویرایش
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* باکس اصلی پیام */}
                            <div
                                className={`max-w-[85%] md:max-w-[60%] px-4 py-2 shadow-md relative ${isMessageFromAdmin ? "order-2" : "order-1"} ${
                                    isMessageFromAdmin
                                        ? "bg-white text-gray-800 rounded-2xl rounded-tr-none"
                                        : "bg-[#dcf8c6] text-gray-800 rounded-2xl rounded-tl-none"
                                }`}
                            >
                                <div className={`text-[10px] font-bold mb-1 opacity-70 ${isMessageFromAdmin ? "text-blue-600" : "text-green-700"}`}>
                                    {msg.sender?.fullName}
                                </div>

                                {msg.files && (
                                    <div className="mb-2 p-2 bg-black/5 rounded-lg border border-black/10 flex items-center gap-2">
                                        <Paperclip size={16} />
                                        <span className="text-blue-600 text-xs truncate">فایل ضمیمه</span>
                                    </div>
                                )}

                                <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
                                    {msg.message}
                                </p>

                                <div className="flex items-center justify-end gap-1 mt-1 select-none">
                                    <span className="text-[10px] text-gray-400">22:14</span>
                                    {isMessageFromAdmin && <CheckCheck size={14} className="text-[#4fc3f7]" />}
                                </div>
                            </div>

                            {/* منوی عملیات برای پیام‌های سمت چپ (کاربر عادی) */}
                            {!isMessageFromAdmin && (
                                <div className="relative order-2">
                                    <button
                                        onClick={() => toggleMenu(msg.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:bg-black/5 rounded-full"
                                    >
                                        <MoreVertical size={16} />
                                    </button>

                                    {isMenuActive && (
                                        <div
                                            ref={menuRef}
                                            className="absolute left-0 bottom-7 z-50 bg-white shadow-lg border border-gray-200 rounded-lg py-1 w-28 animate-in fade-in zoom-in duration-150"
                                        >
                                            <button
                                                onClick={() => {
                                                    deleteMessage(Number(msg.id));
                                                    setActiveMenuId(null);
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 text-right"
                                            >
                                                <Trash2 size={12} />
                                                حذف
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(msg)}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-right"
                                            >
                                                <Edit2 size={12} />
                                                ویرایش
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

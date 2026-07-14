"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    useGetChatHistory,
    useGetRoom,
    useSendChat,
    useUploadFile,
} from "@/core/api/admin/chat/queries";

import { ChatSidebar } from "@/components/chat/comps/ChatSidebar";
import { ChatHeader } from "@/components/chat/comps/ChatHeader";
import { ChatMessages } from "@/components/chat/comps/ChatMessages";
import { ChatComposer } from "@/components/chat/comps/ChatComposer";

type Room = {
    room: string;
    users?: Array<{ id?: string | number } | string | number>;
};


const Chat = () => {
    const [messageText, setMessageText] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: rooms, isLoading: isLoadingRooms } = useGetRoom();

    const myUserId = "1";
    const myRole: "admin" | "user" = "user";
    const isAdmin = myRole === "admin";

    const roomsList: Room[] = Array.isArray(rooms) ? rooms : rooms?.data ?? [];

    const canEnterRoom = (room: Room) => {
        if (isAdmin) return true;
        const users = room?.users ?? [];
        return users.some((u: any) => String(u.id ?? u) === String(myUserId));
    };

    useEffect(() => {
        if (selectedRoom) return;
        const firstAllowedRoom = roomsList.find((room) => canEnterRoom(room));
        if (firstAllowedRoom?.room) {
            setSelectedRoom(firstAllowedRoom.room);
        }
    }, [roomsList, selectedRoom]);

    const { data: chatHistory, isLoading: isLoadingHistory } = useGetChatHistory(selectedRoom || "");
    const { mutate: sendMessage, isPending: isSending } = useSendChat();
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const trimmedMsg = messageText.trim();

        if (!trimmedMsg) return;
        if (!selectedRoom) {
            alert("لطفاً ابتدا یک اتاق گفتگو را انتخاب کنید.");
            return;
        }

        sendMessage(
            {
                room: selectedRoom,
                message: trimmedMsg,
                getterId: 175,
            },
            {
                onSuccess: () => {
                    setMessageText("");
                },
                onError: (err) => {
                    console.error("خطا در ارسال:", err);
                    alert("خطا در ارسال پیام");
                },
            }
        );
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

        if (!selectedRoom) {
            alert("لطفاً ابتدا یک اتاق گفتگو را انتخاب کنید.");
            return;
        }

        if (selectedFiles.length === 0) return;

        uploadFile(
            { room: selectedRoom, files: selectedFiles },
            {
                onSuccess: () => {
                    if (fileInputRef.current) fileInputRef.current.value = "";
                },
                onError: (err) => {
                    console.error("خطا در آپلود فایل:", err);
                },
            }
        );
    };



    if (isLoadingRooms) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2481cc]" />
                    <p className="text-gray-500 font-medium">در حال راه اندازی گفت‌وگو...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex overflow-hidden bg-[#f0f2f5] font-sans">
            <ChatSidebar
                roomsList={roomsList}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="relative flex min-w-0 flex-1 flex-col bg-[#e7ebf0]">
                <ChatHeader
                    selectedRoom={selectedRoom}
                    onOpenSidebar={() => setIsMobileSidebarOpen(true)}
                />

                <ChatMessages
                    chatHistory={chatHistory}
                    isLoadingHistory={isLoadingHistory}
                    roomId={selectedRoom || ""}
                    scrollRef={scrollRef}
                />

                <ChatComposer
                    messageText={messageText}
                    setMessageText={setMessageText}
                    fileInputRef={fileInputRef}
                    handleSend={handleSend}
                    handleFileChange={handleFileChange}
                    isSending={isSending}
                    isUploading={isUploading}
                />
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
        </div>
    );
};

export default Chat;

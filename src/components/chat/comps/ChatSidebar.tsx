"use client"
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Room = {
    room: string;
    users?: Array<{ id?: string | number } | string | number>;
};

export const ChatSidebar = ({
    roomsList,
    selectedRoom,
    setSelectedRoom,
    isMobileOpen = false,
    onMobileClose,
}: {
    roomsList: Room[];
    selectedRoom: string | null;
    setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}) => {

    const router = useRouter();

    const handleSelectRoom = (room: string) => {
        setSelectedRoom(room);
        onMobileClose?.();
    };

    return (
        <>
            {isMobileOpen && (
                <button
                    type="button"
                    aria-label="بستن منو"
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            <div
                className={[
                    "fixed inset-y-0 left-0 z-50 flex w-[min(100%,320px)] flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:static md:z-auto md:w-[280px] md:shrink-0 md:translate-x-0 lg:w-[350px]",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                ].join(" ")}
            >
                <div className="flex items-center gap-3 p-4">
                    <button
                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                        onClick={() => router.push('/')}
                        type="button"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="w-full rounded-xl border-none bg-[#f1f1f1] py-2 pe-3 ps-10 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    </div>
                </div>

                <div className="custom-scrollbar flex-1 overflow-y-auto">
                    {roomsList.map((room) => {
                        const isActive = selectedRoom === room.room;

                        return (
                            <button
                                key={room.room}
                                type="button"
                                onClick={() => handleSelectRoom(room.room)}
                                className={[
                                    "flex w-full cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 text-right transition-all",
                                    isActive ? "bg-[#2481cc] text-white" : "hover:bg-gray-50",
                                ].join(" ")}
                            >
                                <div
                                    className={[
                                        "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold shadow-sm",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-gradient-to-tr from-blue-400 to-blue-600 text-white",
                                    ].join(" ")}
                                >
                                    {String(room.room).charAt(0).toUpperCase()}
                                </div>

                                <div className="min-w-0 flex-1 overflow-hidden">
                                    <div className="flex items-center justify-between">
                                        <h4 className="truncate text-sm font-bold">
                                            اتاق گفتگو {room.room}
                                        </h4>
                                        <span
                                            className={`text-[10px] ${isActive ? "text-blue-100" : "text-gray-400"
                                                }`}
                                        >
                                            12:45 PM
                                        </span>
                                    </div>

                                    <p
                                        className={`mt-0.5 truncate text-xs ${isActive ? "text-blue-100" : "text-gray-500"
                                            }`}
                                    >
                                        {room?.users?.length ?? 0} کاربر در این گروه عضو هستند
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

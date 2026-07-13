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
}: {
    roomsList: Room[];
    selectedRoom: string | null;
    setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;

}) => {

    const router = useRouter();

    return (
        <div className="w-[350px] bg-white border-l border-gray-200 flex flex-col hidden md:flex">
            <div className="p-4 flex items-center gap-3">
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => router.push('/')}
                    type="button"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="جستجو..."
                        className="w-full bg-[#f1f1f1] border-none rounded-xl py-2 px-10 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {roomsList.map((room) => {
                    const isActive = selectedRoom === room.room;

                    return (
                        <button
                            key={room.room}
                            type="button"
                            onClick={() => setSelectedRoom(room.room)}
                            className={[
                                "w-full text-right px-4 py-3 flex items-center gap-3 transition-all border-b border-gray-100",
                                "cursor-pointer",
                                isActive ? "bg-[#2481cc] text-white" : "hover:bg-gray-50",
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm",
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-gradient-to-tr from-blue-400 to-blue-600 text-white",
                                ].join(" ")}
                            >
                                {String(room.room).charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-sm truncate">
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
                                    className={`text-xs truncate mt-0.5 ${isActive ? "text-blue-100" : "text-gray-500"
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
    );
};

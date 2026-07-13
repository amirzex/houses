import { MoreVertical, Search } from "lucide-react";

export const ChatHeader = ({ selectedRoom }: { selectedRoom: string | null }) => {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-20">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#2481cc] rounded-full flex items-center justify-center text-white font-bold">
                    {selectedRoom?.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">
                        پشتیبانی سیستم (اتاق {selectedRoom})
                    </h3>
                    <p className="text-xs text-[#2481cc]">آنلاین</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
                <Search size={20} className="cursor-pointer hover:text-blue-500" />
                <MoreVertical size={20} className="cursor-pointer hover:text-blue-500" />
            </div>
        </div>
    );
};
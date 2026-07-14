import { Menu, MoreVertical, Search } from "lucide-react";

export const ChatHeader = ({
    selectedRoom,
    onOpenSidebar,
}: {
    selectedRoom: string | null;
    onOpenSidebar?: () => void;
}) => {
    return (
        <div className="z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:h-16 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
                    aria-label="لیست گفتگوها"
                >
                    <Menu size={20} />
                </button>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2481cc] font-bold text-white">
                    {selectedRoom?.charAt(0)}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate font-bold text-gray-800">
                        پشتیبانی سیستم (اتاق {selectedRoom})
                    </h3>
                    <p className="text-xs text-[#2481cc]">آنلاین</p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-gray-500">
                <Search size={20} className="cursor-pointer hover:text-blue-500" />
                <MoreVertical size={20} className="cursor-pointer hover:text-blue-500" />
            </div>
        </div>
    );
};

import { Check, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface ActionMenuProps {
    onDelete: () => void;
    onApprove?: () => void;
    isApproved?: boolean;
}

export const ActionMenu = ({ onDelete, onApprove, isApproved }: ActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-400"
            >
                <MoreHorizontal size={20} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl animate-in zoom-in-95 dark:border-white/10 dark:bg-[#252525] sm:top-0 sm:left-full sm:mt-2 sm:right-auto">
                    {!isApproved && (
                        <button
                            onClick={() => { onApprove?.(); setIsOpen(false); }}
                            className="w-full px-4 py-3 text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between"
                        >
                            تایید کامنت <Check size={14} />
                        </button>
                    )}
                    <button
                        onClick={() => { onDelete(); setIsOpen(false); }}
                        className="w-full px-4 py-3 text-[11px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-between"
                    >
                        حذف <Trash2 size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

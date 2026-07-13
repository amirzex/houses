import { Trash2, Pencil } from "lucide-react";

export const TableActions = ({ onDelete, onEdit }: { onDelete: () => void, onEdit: () => void }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onEdit}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                title="ویرایش"
            >
                <Pencil size={16} />
            </button>
            <button
                onClick={onDelete}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                title="حذف"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

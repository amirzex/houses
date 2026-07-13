import React from "react";

interface Column {
    header: string;
    accessor: (item: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export const DataTable = ({ columns, data, isLoading, emptyMessage = "داده‌ای یافت نشد" }: DataTableProps) => {
    return (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] shadow-sm border border-slate-50 dark:border-white/5 h-[600px] overflow-y-auto">
            <div className="overflow-x-auto text-right" dir="rtl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-white/5 text-slate-400 font-black uppercase tracking-wider">
                            {columns.map((col, idx) => (
                                <th key={idx} className="p-5">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                        {!data || data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="p-8 text-center text-slate-500">{emptyMessage}</td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr key={item.id || rowIndex} className="group hover:bg-slate-50/30 dark:hover:bg-white/[0.02] transition-all">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="p-5">{col.accessor(item)}</td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

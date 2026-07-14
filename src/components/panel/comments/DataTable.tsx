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

export const DataTable = ({
  columns,
  data,
  isLoading,
  emptyMessage = "داده‌ای یافت نشد",
}: DataTableProps) => {
  return (
    <div className="panel-table-shell">
      <div className="overflow-x-auto text-right" dir="rtl">
        <table className="panel-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="panel-empty">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : !data || data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="panel-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={item.id || rowIndex}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>{col.accessor(item)}</td>
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

import { TableActions } from "./Action";


export const getHouseColumns = (
    onDelete: (id: number) => void,
    onEdit: (id: number) => void
) => [
        { header: "عنوان ملک", accessor: (item: any) => <span className="text- font-bold">{item.title}</span> },
        { header: "موقعیت", accessor: (item: any) => <span className="text-">{item.location}</span> },
        { header: "نوع ملک", accessor: (item: any) => <span className="text-">{item.categories}</span> },
        {
            header: "قیمت/اجاره",
            accessor: (item: any) => <span className="text- font-black text-primary">{item.price?.toLocaleString("fa-IR")}</span>
        },
        {
            header: "عملیات",
            accessor: (item: any) => (
                <TableActions
                    onDelete={() => onDelete(item.id)}
                    onEdit={() => onEdit(item.id)}
                />
            ),
        },
    ];

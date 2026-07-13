import { Pagination } from "@heroui/pagination"

// installation

// npm install @heroui/pagination  


const PaginationFor = () => {

    return (
        <div className=" w-full flex justify-center items-center">
            <Pagination
                initialPage={1}
                total={10}
                className="gap-2"
                classNames={{
                    base: "bg-gray-100 p-3 rounded-xl flex justify-center items-center w-full max-w-2xl",
                    wrapper: "gap-3",
                    prev: "bg-primary-100 text-primary w-12 rounded-xl ",
                    next: "bg-primary-100 text-primary w-12",
                    item: "bg-transparent text-gray-700 hover:bg-primary-100 w-12",
                    cursor: "bg-blue-900 text-white font-bold w-10 h-10 rounded-xl",
                }}
            />
        </div>
    )
}

export default PaginationFor
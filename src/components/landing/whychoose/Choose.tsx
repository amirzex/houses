"use client";

import Image from "next/image";
import whyChoose from "../../../assets/landing/houses.jpg";
import DestinationCard from "@/components/common/DistinationCard";
import Link from "next/link";
import { useLocations } from "@/core/api/locations/queries";

const Choose = () => {

    const { data, isLoading, isError } = useLocations({
        page: 1,
        limit: 4,
        sort: "id",
        order: "ASC",
    });
    const locations = data?.data ?? [];

    return (
        <>
            {/* header desktop */}
            <div className="flex flex-col justify-center items-center gap-5 mt-20 max-sm:hidden md:flex">
                <p className="text-blue-900 text-2xl">ویلا ها را با ما انتخاب کنید</p>
                <h2 className="text-4xl">اجاره ویلا در محبوب ترین مقاصد ایران</h2>
            </div>

            {/* header mobile */}
            <div className="flex flex-col justify-center items-center gap-5 mt-20 max-sm:flex md:hidden">
                <p className="text-blue-900 text-2xl max-sm:text-sm">
                    ویلا ها را با ما انتخاب کنید
                </p>
                <h2 className="text-4xl max-sm:text-xl">
                    اجاره ویلا در محبوب ترین مقاصد ایران
                </h2>
            </div>

            <div className="max-sm:flex-col flex flex-row justify-center items-center gap-10 px-25 max-sm:px-5 w-full mt-30 max-sm:mt-10 ">

                {isLoading && <p>در حال دریافت مقاصد محبوب...</p>}

                {isError && !isLoading && <p>خطا در دریافت اطلاعات مقصدها</p>}

                {!isLoading &&
                    !isError &&
                    locations.map((item: any) => (
                        <DestinationCard
                            key={item.id}
                            title={`اجاره ویلا در ${item.area_name}`}
                            count={item.villa_count ?? item.count ?? 0} 
                            countLabel="مورد"
                            imageSrc={item.image_url || whyChoose} 
                        />
                    ))}
                {!isLoading && !isError && locations.length === 0 && (
                    <>
                        <DestinationCard
                            title="اجاره ویلا در سوادکوه"
                            count={50}
                            countLabel="مورد"
                            imageSrc={whyChoose}
                        />
                        <DestinationCard
                            title="اجاره ویلا در رامسر"
                            count={35}
                            countLabel="مورد"
                            imageSrc={whyChoose}
                        />
                    </>
                )}
            </div>

            <div className="w-full flex justify-center items-center mt-15">
                <Link
                    href="/"
                    className="border border-blue-900 p-5 rounded-full text-blue-900 text-2xl max-sm:text-sm max-sm:p-3 "
                >
                    مشاهده بیشتر
                </Link>
            </div>
        </>
    );
};

export default Choose;

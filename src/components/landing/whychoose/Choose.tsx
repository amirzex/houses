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
        <section className="section-wrap mt-12 flex flex-col items-center sm:mt-16 xl:mt-24">
            <div className="flex flex-col items-center justify-center gap-2 text-center sm:gap-3">
                <p className="section-eyebrow">ویلا ها را با ما انتخاب کنید</p>
                <h2 className="section-title">اجاره ویلا در محبوب ترین مقاصد ایران</h2>
            </div>

            <div className="mt-8 destinations-grid sm:mt-12">
                {isLoading && <p className="text-ink-muted col-span-full text-center">در حال دریافت مقاصد محبوب...</p>}

                {isError && !isLoading && <p className="text-danger col-span-full text-center">خطا در دریافت اطلاعات مقصدها</p>}

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

            <div className="mt-10 flex w-full items-center justify-center sm:mt-12">
                <Link href="/rent" className="btn-outline-brand-lg">
                    مشاهده بیشتر
                </Link>
            </div>
        </section>
    );
};

export default Choose;

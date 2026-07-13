"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import arrow from "../../../../assets/landing/Frame.svg";

import img1 from "../../../../assets/landing/villa.png";
import img2 from "../../../../assets/landing/pool.jpg";
import img3 from "../../../../assets/landing/kolbe.jpg";
import img4 from "../../../../assets/landing/504b1d866abb82631873b29a03394f56ad50f878.jpg";
import img5 from "../../../../assets/landing/apartment.jpg";
import img6 from "../../../../assets/landing/beech.png";

import { useCategories } from "@/core/api/categories/queries";

const categoryImages = [img1, img2, img3, img4, img5, img6];

const CategoryDesktop = () => {
    const { data, isLoading, isError } = useCategories({
        page: 1,
        limit: 6,
        sort: "name",
        order: "DESC",
    });

    if (isLoading) return <p>در حال دریافت دسته‌بندی‌ها...</p>;
    if (isError) return <p>خطا در دریافت دسته‌بندی‌ها</p>;

    const categories = data?.data || [];

    return (
        <div className="w-full flex flex-row justify-center items-center gap-3">
            {categories.map((cat, index) => (
                <div
                    key={cat.id}
                    className="relative bg-gray-400 w-[16.6%] h-110 rounded-4xl flex justify-center overflow-hidden"
                >
                    <Image
                        src={categoryImages[index] || categoryImages[0]}
                        fill
                        alt={cat.name}
                        className="object-cover brightness-75 hover:scale-110 transition-all duration-300 hover:brightness-100"
                    />

                    <Link
                        href={`/categories/${cat.slug || cat.id}`}
                        className="absolute bottom-5 right-5 bg-white text-black text-center text-xl p-2 w-[40%] rounded-4xl"
                    >
                        {cat.name}
                    </Link>

                    <button className="absolute bottom-5 left-5 bg-white w-[10%] rounded-full overflow-hidden">
                        <Image
                            src={arrow}
                            width={100}
                            alt="arrow"
                            className="object-cover"
                        />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryDesktop;

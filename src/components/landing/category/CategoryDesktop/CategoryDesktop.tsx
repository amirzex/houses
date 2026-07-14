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

    if (isLoading) return <p className="text-center text-ink-muted">در حال دریافت دسته‌بندی‌ها...</p>;
    if (isError) return <p className="text-center text-danger">خطا در دریافت دسته‌بندی‌ها</p>;

    const categories = data?.data || [];

    return (
        <div className="grid w-full grid-cols-6 gap-3 xl:gap-4">
            {categories.map((cat, index) => (
                <div
                    key={cat.id}
                    className="group relative flex aspect-[3/5] min-h-0 w-full justify-center overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                    <Image
                        src={categoryImages[index] || categoryImages[0]}
                        fill
                        sizes="(max-width: 1536px) 16vw, 200px"
                        alt={cat.name}
                        className="object-cover brightness-[0.72] transition-all duration-500 group-hover:scale-110 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <Link
                        href={`/categories/${cat.slug || cat.id}`}
                        className="absolute bottom-3 right-2 z-10 max-w-[70%] truncate rounded-full bg-white/95 px-2.5 py-1.5 text-center text-xs font-bold text-ink shadow-md backdrop-blur-sm transition hover:bg-white xl:bottom-4 xl:right-3 xl:px-3 xl:py-2 xl:text-sm"
                    >
                        {cat.name}
                    </Link>

                    <Link
                        href={`/categories/${cat.slug || cat.id}`}
                        className="absolute bottom-3 left-2 z-10 flex size-8 items-center justify-center overflow-hidden rounded-full bg-white/95 shadow-md transition hover:scale-105 xl:bottom-4 xl:left-3 xl:size-10"
                        aria-label={cat.name}
                    >
                        <Image
                            src={arrow}
                            width={28}
                            height={28}
                            alt="arrow"
                            className="object-contain"
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryDesktop;

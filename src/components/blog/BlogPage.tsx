"use client"
import BlogCard from '@/components/common/BlogCard'
import Breadcrumb from '@/components/common/Breadcrumb'
import React from 'react'
import BlogFilter from './BlogFilter'
import { useGetBlog } from '@/core/api/blog/queries'
import FilterBlogMobile from './FilterBlogMobile'
import { useCategories } from '@/core/api/categories/queries'
import useDebounce from "@/hooks/use-debounce"

const BlogPage = () => {

    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");


    const { data, isLoading, error } = useGetBlog(selectedCategory, searchTerm);

    const { data: Category, isError } = useCategories({
        page: 1,
        limit: 10,
        sort: "name",
        order: "DESC",
    });
    if (isLoading) return <p>در حال دریافت بلاگ‌ها...</p>;
    if (error) return <p>خطا در دریافت اطلاعات</p>;
    return (
        <div className='page-shell flex w-full flex-col items-center justify-center pb-8' dir='rtl'>

            <Breadcrumb />

            <div className='hidden w-full md:block'>
                <BlogFilter
                    data={Category}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            <div className='w-full md:hidden'>
                <FilterBlogMobile />
            </div>

            <div className='cards-grid w-full py-6 sm:py-8'>
                {data?.data?.map((item) => (
                    <div className='w-full min-w-0' key={item.id}>
                        <BlogCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogPage
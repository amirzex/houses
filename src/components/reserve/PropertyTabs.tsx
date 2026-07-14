"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import IconHolder from './IconHolder';
import { getComment } from '@/core/api/comments/api';


const PropertyTabs = ({ property }) => {
    const house_id = property.id;

    const [activeTab, setActiveTab] = useState('about');
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState(null);


    useEffect(() => {
        async function fetchReviews() {
            if (activeTab !== 'reviews') return;

            setReviewsLoading(true);
            setReviewsError(null);

            try {
                const response = await getComment(house_id);
                setReviews(response.data || []);
            } catch (error) {
                console.error('خطا در دریافت نظرات:', error);
                setReviewsError('دریافت نظرات با مشکل مواجه شد');
            } finally {
                setReviewsLoading(false);
            }
        }

        fetchReviews();
    }, [activeTab, house_id]);


    const tabContents = {
        about: {
            title: ` چرا   ${property.title}  رو انتخاب کنیم؟  `,
            content: property.caption,
            buttonText: "مشاهده بیشتر"
        },
        amenities: {
            title: "امکانات اقامتگاه",
            buttonText: "مشاهده همه "
        },
        reviews: {
            title: "نظرات کاربران",
            buttonText: "مشاهده همه نظرات"
        }
    };
    // state management

    // about tabs
    const renderContent = () => {
        if (activeTab === 'about') {
            return (
                <div className='w-full flex flex-col gap-3'>
                    <h3 className='text-right text-2xl w-full'>{tabContents.about.title}</h3>
                    <p className='text-right'>{tabContents.about.content}</p>
                </div>
            );
        }

        if (activeTab === 'amenities') {
            return (
                <div className='w-full flex flex-col gap-3'>
                    <IconHolder items={property} />
                </div>
            );
        }
        // tab reviews
        if (activeTab === 'reviews') {
            return (
                <div className='w-full flex flex-col gap-3'>
                    <h3 className='text-right text-2xl w-full'>{tabContents.reviews.title}</h3>


                    {reviewsLoading && (
                        <div className='text-center py-4'>
                            <p>در حال بارگذاری نظرات...</p>
                        </div>
                    )}


                    {reviewsError && (
                        <div className='text-center py-4 text-red-500'>
                            <p>{reviewsError}</p>
                        </div>
                    )}

                    {/* comments*/}
                    {!reviewsLoading && !reviewsError && (
                        <div className='text-right space-y-4'>
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={review.id || index} className='border-b pb-3'>
                                        <div className='flex justify-between'>
                                            <span className='font-bold'>{review.user_id || review.name || 'کاربر'}</span>
                                            <span>{'⭐'.repeat(review.rating || '')}</span>
                                        </div>
                                        <p className='mt-2'>{review.caption || review.text || review.content}</p>
                                        <p className='mt-2'>{review.title || review.text || review.content}</p>
                                        {review.date && (
                                            <span className='text-sm text-gray-500 mt-1 block'>
                                                {new Date(review.date).toLocaleDateString('fa-IR')}
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className='text-center text-gray-500 py-4'>
                                    هنوز نظری برای این اقامتگاه ثبت نشده است
                                </p>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <div className='w-full flex flex-col gap-5 p-4 rounded-lg'>
            {/* buttons*/}
            <div className='flex w-full flex-row-reverse flex-wrap items-center justify-start gap-2 sm:gap-3'>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`rounded-4xl px-4 py-2.5 text-center text-sm transition-all duration-300 sm:px-5 sm:py-3 sm:text-base ${activeTab === 'about'
                        ? 'bg-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    درباره املاک
                </button>
                <button
                    onClick={() => setActiveTab('amenities')}
                    className={`rounded-4xl px-4 py-2.5 text-center text-sm transition-all duration-300 sm:px-5 sm:py-3 sm:text-base ${activeTab === 'amenities'
                        ? 'bg-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    امکانات اقامتگاه
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`rounded-4xl px-4 py-2.5 text-center text-sm transition-all duration-300 sm:px-5 sm:py-3 sm:text-base ${activeTab === 'reviews'
                        ? 'bg-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    نظرات کاربران
                </button>
            </div>

            {/* main data with animation*/}
            <div className='transition-all duration-500 ease-in-out'>
                {renderContent()}
            </div>

            {/* see more button for all tabs */}
            {activeTab !== 'amenities' && (
                <div className='flex w-full flex-row justify-center items-center'>
                    <button className='w-full rounded-4xl border-2 p-3 text-sm transition-colors hover:bg-gray-100 sm:w-auto sm:min-w-[10rem] sm:px-6'>
                        {tabContents[activeTab].buttonText}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyTabs;
import React from 'react';

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-[#F0F0F0] dark:bg-[#272727] dark:text-white rounded-[2rem] mt-20 mx-4 md:mx-8 mb-8 pt-12 pb-6 px-6 md:px-12 font-sans text-gray-800">
      <div className=" mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-6">

        {/* ستون اول: لوگو و توضیحات (سمت راست) */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* لوگو */}
          <div className="flex  items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
              <path d="M2 17h2"></path>
              <path d="M20 17h2"></path>
              <path d="M5.5 8.5l-1.5-1.5"></path>
              <path d="M18.5 8.5l1.5-1.5"></path>
            </svg>
            <span className="text-2xl font-black tracking-wide">Home</span>
          </div>
          <p className="text-sm leading-7 font-medium dark:text-white text-gray-700 text-right">
            ما همراه شما هستیم در مسیر اجاره، خرید و فروش ویلا؛ تا با اطمینان و آرامش، تجربه‌ای دلنشین از انتخاب اقامتگاه یا سرمایه‌گذاری به‌یادماندنی داشته باشید.
          </p>
          {/* شبکه‌های اجتماعی */}
          <div className="flex flex-row-reverse justify-end items-center gap-4 mt-2">
            <a href="#" className="hover:text-blue-600 transition-colors">
              {/* لینکدین */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              {/* اینستاگرام */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              {/* تلگرام / ارسال */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>
        </div>

        {/* ستون دوم: نحوه رزرو اقامتگاه */}
        <div className="lg:w-1/5 flex flex-col gap-4 ">
          <h3 className="text-[#1E3A8A] dark:text-blue-600/90 font-bold text-lg mb-2 ">نحوه رزرو اقامتگاه</h3>
          <ul className="flex flex-col gap-3 text-sm dark:text-white font-medium text-gray-700 list-disc list-inside marker:text-black">
            <li className="hover:text-black cursor-pointer">راهنمای رزرو اقامتگاه</li>
            <li className="hover:text-black cursor-pointer">شیوه پرداخت</li>
            <li className="hover:text-black cursor-pointer">لغو رزرو اقامتگاه</li>
          </ul>
        </div>

        {/* ستون سوم: خدمات مشتریان */}
        <div className="lg:w-1/5 flex flex-col gap-4">
          <h3 className="text-[#1E3A8A] dark:text-blue-600/90 font-bold text-lg mb-2">خدمات مشتریان</h3>
          <ul className="flex flex-col gap-3 dark:text-white text-sm font-medium text-gray-700 list-disc list-inside marker:text-black">
            <li className="hover:text-black cursor-pointer">پرسش های متداول مهمان</li>
            <li className="hover:text-black cursor-pointer">پرسش های متداول میزبان</li>
            <li className="hover:text-black cursor-pointer">چطور اقامتگاه ثبت کنم ؟</li>
            <li className="hover:text-black cursor-pointer">حریم شخصی کاربران</li>
          </ul>
        </div>

        {/* ستون چهارم: راه ارتباطی با ما */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <h3 className="text-[#1E3A8A] dark:text-blue-600/90 font-bold text-lg mb-2">راه ارتباطی با ما</h3>
          <div className="flex flex-col gap-4 text-sm dark:text-white font-medium text-gray-800">
            <p dir="ltr" className="text-right">09229167194 - 098541612310</p>
            <p dir="ltr" className="text-right">Delta@gmail.com</p>
            <p className="leading-6">گیلان ، رشت ، میدان آزادی ، جنب<br />چهار راه عظیمی زاده</p>
          </div>
        </div>

      </div>

      {/* خط جداکننده و کپی‌رایت */}
      <div className=" mx-auto mt-12">
        <hr className="border-gray-300 mb-6" />
        <p className="text-center text-sm font-medium text-gray-500">
          . تمام حقوق مادی و معنوی این اثر برای برند شما محفوظ است
        </p>
      </div>
    </footer>
  );
};

export default Footer;

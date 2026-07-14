import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer dir="rtl" className="relative mx-3 mb-6 mt-16 overflow-hidden rounded-[2rem] border border-border/60 bg-surface px-5 pb-6 pt-10 shadow-[var(--shadow-soft)] md:mx-6 md:px-8 xl:mx-8 xl:mt-24 xl:px-12 dark:border-white/5 dark:bg-[#1a222d] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(12_45_90/0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgb(91_143_217/0.1),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-8">

        <div className="flex flex-col gap-5 lg:w-1/3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/25">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-ink dark:text-white">Home</span>
          </div>
          <p className="text-sm leading-7 font-medium text-ink-muted text-right dark:text-white/70">
            ما همراه شما هستیم در مسیر اجاره، خرید و فروش ویلا؛ تا با اطمینان و آرامش، تجربه‌ای دلنشین از انتخاب اقامتگاه یا سرمایه‌گذاری به‌یادماندنی داشته باشید.
          </p>
          <div className="flex flex-row-reverse items-center justify-end gap-3 mt-1">
            {[
              { label: 'لینکدین', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-brand">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            ))}
            <a href="#" aria-label="اینستاگرام" className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="تلگرام" className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:w-1/5">
          <h3 className="mb-1 text-base font-extrabold text-brand">نحوه رزرو اقامتگاه</h3>
          <ul className="flex flex-col gap-3 text-sm font-medium text-ink-muted dark:text-white/70">
            {['راهنمای رزرو اقامتگاه', 'شیوه پرداخت', 'لغو رزرو اقامتگاه'].map((item) => (
              <li key={item}>
                <Link href="#" className="transition-colors hover:text-brand dark:hover:text-brand">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:w-1/5">
          <h3 className="mb-1 text-base font-extrabold text-brand">خدمات مشتریان</h3>
          <ul className="flex flex-col gap-3 text-sm font-medium text-ink-muted dark:text-white/70">
            {['پرسش های متداول مهمان', 'پرسش های متداول میزبان', 'چطور اقامتگاه ثبت کنم ؟', 'حریم شخصی کاربران'].map((item) => (
              <li key={item}>
                <Link href="#" className="transition-colors hover:text-brand dark:hover:text-brand">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:w-1/4">
          <h3 className="mb-1 text-base font-extrabold text-brand">راه ارتباطی با ما</h3>
          <div className="flex flex-col gap-3 text-sm font-medium text-ink-muted dark:text-white/70">
            <p dir="ltr" className="text-right tracking-wide">09229167194 - 098541612310</p>
            <p dir="ltr" className="text-right">Delta@gmail.com</p>
            <p className="leading-7">گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظیمی زاده</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl">
        <hr className="mb-5 border-border/70 dark:border-white/10" />
        <p className="text-center text-xs font-medium text-ink-muted sm:text-sm">
          تمام حقوق مادی و معنوی این اثر برای برند Home محفوظ است.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

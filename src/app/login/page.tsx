import Image from 'next/image';
import Link from 'next/link';
import apartment from '../../assets/register/modern-tokyo-street-background_23-2149394920.avif';
import Form from "@/components/auth/login/Form";


const Login = () => {
    return (
        <div className="mt-24 flex items-center justify-center p-4 font-sans sm:mt-28 md:mt-32" dir="rtl">
            <div className="flex w-full max-w-6xl flex-col gap-8 p-2 md:flex-row md:gap-10">
                <div className="surface-card flex w-full flex-col px-5 py-8 sm:px-8 sm:py-10 md:w-[42%] lg:px-12">
                    <div className="mb-8 flex items-center justify-center gap-2.5">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/25">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>
                        <span className="text-3xl font-black tracking-tight text-ink dark:text-white">Home</span>
                    </div>

                    <h2 className="mb-6 text-center text-xl font-extrabold text-ink dark:text-white">ورود به حساب کاربری</h2>

                    <div className="mb-8 flex rounded-full bg-muted p-1.5 max-sm:flex-col max-sm:rounded-2xl dark:bg-[#2a3340]">
                        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-medium text-white shadow-md shadow-brand/20 max-sm:rounded-xl">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            ورود به حساب کاربری
                        </button>
                        <Link href="/register" className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-ink-muted transition-colors hover:text-brand dark:text-white/70">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            ساخت حساب کاربری
                        </Link>
                    </div>

                    <div className="mb-8 flex gap-3">
                        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold text-ink transition-colors hover:bg-muted dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold text-ink transition-colors hover:bg-muted dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            Github
                        </button>
                    </div>

                    <div className="mb-8 flex w-full items-center">
                        <div className="h-px flex-1 bg-border dark:bg-white/10" />
                        <span className="px-4 text-sm text-ink-muted">یا میتونید</span>
                        <div className="h-px flex-1 bg-border dark:bg-white/10" />
                    </div>

                    <Form />
                </div>

                <div className="relative hidden h-[680px] md:block md:w-[58%]">
                    <div className="relative h-full w-full overflow-hidden rounded-[28px] shadow-[var(--shadow-lift)]">
                        <Image
                            src={apartment}
                            fill
                            alt="modern apartment"
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                            <div className="h-2.5 w-8 rounded-full bg-brand" />
                            <div className="size-2.5 rounded-full bg-white/80" />
                            <div className="size-2.5 rounded-full bg-white/80" />
                            <div className="size-2.5 rounded-full bg-white/80" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

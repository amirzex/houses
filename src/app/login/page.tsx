import Image from 'next/image';
import Link from 'next/link';
import apartment from '../../assets/register/modern-tokyo-street-background_23-2149394920.avif';
import Form from "@/components/auth/login/Form";


const Login = () => {
    return (

        <div className=" flex items-center justify-center p-4  max-sm:p-0 font-sans mt-30 max-sm:mt-20" dir="rtl">
            <div className=" p-3 flex flex-col gap-10  md:flex-row w-[80%]  max-sm:w-full ">
                <div className="w-full md:w-[40%] flex flex-col px-8 py-10 max-sm:px-3 lg:px-16 shadow-sm rounded-[32px]">
                    <div className="flex justify-center items-center gap-2 mb-8 ">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0e2a86]">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className="text-3xl font-black tracking-tight">Home</span>
                    </div>

                    <h2 className="text-xl font-bold text-center mb-6 ">ورود به حساب کاربری</h2>

                    {/* tabs for login*/}
                    <div className="max-sm:flex-col max-sm:rounded-2xl flex bg-gray-100 dark:bg-[#353535]  p-1.5 rounded-full mb-8">
                        <button className="flex-1 bg-[#1a3b99] text-white py-3 rounded-full max-sm:rounded-xl text-sm font-medium flex justify-center items-center gap-2 shadow-md">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            ورود به حساب کاربری
                        </button>
                        <Link href="/register" className="flex-1 text-gray-600 dark:text-white py-3 rounded-full text-sm font-medium flex justify-center items-center gap-2 transition-colors hover:text-gray-900">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            ساخت حساب کاربری
                        </Link>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button className="flex-1 border dark:bg-[#353535] dark:text-white  rounded-full py-3 flex justify-center items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button className="flex-1 border dark:bg-[#353535] dark:text-white rounded-full py-3 flex justify-center items-center gap-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            Github
                        </button>
                    </div>

                    {/* line*/}
                    <div className="flex items-center w-full mb-8">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-gray-400 text-sm">یا میتونید</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* info form*/}
                    <Form />

                </div>

                {/* picture left*/}
                <div className="hidden md:block md:w-[60%] relative h-[700px]">
                    <div className="w-full h-full relative rounded-[28px] overflow-hidden">
                        <Image
                            src={apartment}
                            fill
                            alt="modern apartment"
                            className="object-cover"
                            unoptimized
                        />
                        {/* buttom slider*/}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            <div className="w-8 h-2.5 bg-[#1a3b99] rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-white/80 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;
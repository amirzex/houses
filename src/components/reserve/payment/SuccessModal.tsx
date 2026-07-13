export const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
            <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md shadow-2xl flex flex-col transform transition-all">

                {/* بخش بالایی (خاکستری روشن) */}
                <div className="bg-gray-100 flex flex-col items-center justify-center pt-10 pb-8 px-6">
                    {/* آیکون تیک */}
                    <div className="w-20 h-20 bg-[#2b8a7b] rounded-full flex items-center justify-center mb-6 shadow-md">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    {/* متن موفقیت */}
                    <h3 className="text-xl font-bold text-blue-900 text-center">
                        رزرو بلیت شما با موفقیت انجام شد !
                    </h3>
                </div>

                {/* بخش پایینی (سفید - دکمه‌ها) */}
                <div className="bg-white px-6 py-6 flex items-center justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="bg-blue-800 text-white rounded-full px-4 py-2.5 font-medium text-sm w-1/2 hover:bg-blue-700 transition"
                    >
                        بازگشت به صفحه اصلی
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-blue-800 text-blue-800 rounded-full px-4 py-2.5 font-medium text-sm w-1/2 hover:bg-blue-50 transition"
                    >
                        بلیت های من
                    </button>
                </div>

            </div>
        </div>
    );
};
export const Step3Confirmation = () => {
    return (
        <div className="flex flex-col gap-8" dir="ltr">
            <div className="flex flex-row max-sm:flex-col-reverse justify-center gap-8">

                <div className="w-[70%] max-sm:w-full flex flex-col gap-6" dir="rtl">
                    <div>
                        <h2 className="text-xl font-bold text-blue-900 mb-4 dark:text-[#D9D9E0]">هزینه های جانبی</h2>
                        <p className="text-gray-600 leading-relaxed text-justify dark:text-[#D9D9E0]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.
                        </p>
                    </div>

                    <hr className="border-gray-200 mt-10 mb-4" />

                    <div className="flex flex-col gap-4 text-gray-700">
                        <p className="font-medium text-lg dark:text-[#D9D9E0]">
                            اطلاع رسانی سفر <span className="text-gray-500 text-base font-normal dark:text-[#D9D9E0]">( اطلاعات بلیت و اطلاع رسانی بعدی به این آدرس ارسال می شود . )</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-[#D9D9E0]">
                            <div>شماره تماس <span className="font-semibold text-blue-900 text-lg mr-2 dark:text-blue-600/90">09229167194</span></div>
                            <div>ایمیل <span className="font-semibold text-blue-900 text-lg mr-2 dark:text-blue-600/90">Example@gmail.com</span></div>
                        </div>
                    </div>
                </div>

                <div className=" w-[30%] max-sm:w-full" dir="rtl">
                    <div className="bg-gray-100 dark:bg-[#353535]  rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-blue-900 mb-2 dark:text-white">مشخصات مسافران</h3>

                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-gray-800 dark:text-white">بازه سنی</span>
                            <span className="text-gray-700 dark:text-white">میانسال</span>
                        </div>
                        <div className="flex items-center justify-between text-sm ">
                            <span className="md:hidden max-sm:block dark:text-white"> نام </span>
                            <span className="font-bold text-gray-800 max-sm:hidden md:hidden dark:text-white">نام و  خانوادگی</span>
                            <span className="text-gray-700 dark:text-white">امیر محمد خیرآبادی</span>
                        </div>
                        <div className="flex items-center justify-between text-sm dark:text-white">
                            <span className="font-bold text-gray-800 dark:text-white">جنسیت</span>
                            <span className="text-gray-700 dark:text-white">مرد</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-gray-800 dark:text-white">کد ملی</span>
                            <span className="text-gray-700 dark:text-white">208148****151</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-gray-800 dark:text-white">خدمات</span>
                            <span className="text-gray-700 dark:text-white">-</span>
                        </div>
                        <div className="flex items-center justify-between text-sm ">
                            <span className="font-bold text-gray-800 dark:text-white">مبلغ خدمات</span>
                            <span className="text-gray-700 dark:text-white">-</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-gray-800 dark:text-white">قیمت</span>
                            <span className="text-gray-800 font-bold dark:text-white">1.000.000 تومان</span>
                        </div>

                        <button className="w-full bg-blue-800 text-white py-3 rounded-full mt-4 hover:bg-blue-700 transition">
                            ویرایش مسافران
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
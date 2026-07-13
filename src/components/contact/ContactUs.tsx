"use client"
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ContactForm from './ContactForm';
import Breadcrumb from '../common/Breadcrumb';
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ContactUs = () => {
    const position = [37.2808, 49.5832]

    return (
        <div className='flex flex-col w-full px-15 max-sm:px-5 gap-16 font-sans text-gray-800' dir="rtl">

            {/* Breadcrumb */}
            <Breadcrumb />


            <div className='w-full flex flex-col md:flex-row justify-between items-center gap-10'>

                <div className='w-full md:w-[60%] flex flex-col gap-6'>
                    <h2 className="text-3xl md:text-4xl max-sm:text-2xl font-black dark:text-[#D9D9E0] text-black leading-tight">
                        بیش از یک مشاور املاک؛<br />شریک آرامش و سرمایه شما
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        با تخصص، شفافیت و تعهد، رویای ملک ایده‌آل را به واقعیت تبدیل می‌کنیم. از مشاوره تا کلید، همراه شما هستیم
                    </p>
                </div>


                <div className='w-full md:w-[40%] flex flex-col  gap-4 items-start'>

                    <div className="flex flex-row-reverse items-center justify-center w-[80%] max-sm:w-full bg-white dark:bg-[#353535] p-4 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-r-4 border-[#1a3b99]">
                        <span className="text-gray-500 text-xl max-sm:text-xs w-[90%]">گیلان، رشت، میدان آزادی، جنب چهارراه عظیمی زاده</span>
                        <svg className="text-gray-600 shrink-0 w-[10%]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>

                    <div className="flex flex-row-reverse items-center justify-center w-[80%] max-sm:w-full bg-white dark:bg-[#353535] p-4 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-r-4 border-[#1a3b99]">
                        <span className="text-gray-500 text-xl max-sm:text-sm w-[90%]" dir="rtl">09229167194 - 098541612310</span>
                        <svg className="text-gray-600 shrink-0 w-[10%]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>

                    <div className="flex flex-row-reverse items-center justify-center w-[80%] max-sm:w-full dark:bg-[#353535] bg-white p-4 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-r-4 border-[#1a3b99]">
                        <span className="text-gray-500 text-xl max-sm:text-sm w-[90%]" dir="rtl">Delta@gmail.com</span>
                        <svg className="text-gray-600 shrink-0 w-[10%]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-8">
                <div className="text-center flex flex-col gap-2">
                    <span className="text-[#1a3b99] font-bold text-sm">برای بهترین تجربه</span>
                    <h3 className="text-2xl md:text-3xl font-black dark:text-[#D9D9E0]">نظرات خود را به ما بگید</h3>
                </div>

                <div className="w-ful rounded-[32px]  p-2 gap-10 flex flex-col-reverse md:flex-row-reverse  ">
                    <ContactForm />

                    <div className="w-full md:w-[60%] relative rounded-[28px] overflow-hidden bg-gray-200 min-h-[350px] z-0">
                        <MapContainer
                            center={position}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="absolute inset-0 w-full h-full grayscale-[20%]"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    گیلان، رشت، میدان آزادی
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ContactUs

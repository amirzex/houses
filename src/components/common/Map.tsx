'use client'

const LocationMap = () => {
    
    const embedUrl = "https://neshan.org/maps/iframe/places/sari-city#c36.566-53.143-11z-0p/36.5659240346489/53.058708408701854";

    return (
        <div className='flex justify-center items-center max-sm:overflow-hidden rounded-4xl max-sm:h-70 w-full'>
            <iframe
                title="map-iframe"
                src={embedUrl}
                width="100%" // عرض رو ۱۰۰ درصد گذاشتم تا ریپانسیو باشه
                height="500" // ارتفاع رو طبق کد قبلی خودت ۵۰۰ گذاشتم
                className="border-0 rounded-4xl overflow-hidden shadow-lg"
                allowFullScreen
                loading="lazy"
            />
        </div>
    )
}

export default LocationMap

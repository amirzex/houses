'use client'

const LocationMap = () => {
    
    const embedUrl = "https://neshan.org/maps/iframe/places/sari-city#c36.566-53.143-11z-0p/36.5659240346489/53.058708408701854";

    return (
        <div className='flex h-[280px] w-full items-center justify-center overflow-hidden rounded-3xl sm:h-[380px] md:h-[500px]'>
            <iframe
                title="map-iframe"
                src={embedUrl}
                width="100%"
                height="100%"
                className="h-full min-h-full w-full border-0 rounded-3xl shadow-lg"
                allowFullScreen
                loading="lazy"
            />
        </div>
    )
}

export default LocationMap

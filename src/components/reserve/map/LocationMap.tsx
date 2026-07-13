// "use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This is to fix the default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const LocationMap = () => {
    const position = [34.0522, -118.2437]; // Example: Los Angeles coordinates

    // Sample locations from your list
    const locations = [
        { id: 1, pos: [34.0522, -118.2437], title: "خانه ویلایی با پارکینگ" },
        { id: 2, pos: [34.055, -118.25], title: "خانه ویلایی نزدیک مرکز شهر" },
        { id: 3, pos: [34.048, -118.24], title: "آپارتمان مدرن" },
    ];

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '24px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map(loc => (
                <Marker key={loc.id} position={loc.pos}>
                    <Popup>
                        {loc.title}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LocationMap;

"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow, TrafficLayer } from "@react-google-maps/api";
import { useState } from "react";
import { Map as MapIcon, Plane, Activity, Navigation } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "24px",
};

const mapOptions = {
  styles: [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#444444" }]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{ "color": "#f2f2f2" }]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{ "visibility": "simplified" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{ "color": "#16A34A" }, { "visibility": "on" }, { "opacity": 0.1 }]
    }
  ],
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  mapTypeId: 'roadmap',
};

interface MapListing {
  id: string;
  title: string;
  location: string;
  price: string;
  lat: number;
  lng: number;
  image: string;
}

interface ListingMapProps {
  listings: MapListing[];
}

export function ListingMap({ listings }: ListingMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedListing, setSelectedListing] = useState<MapListing | null>(null);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const center = {
    lat: 12.9716, // Bangalore Center
    lng: 77.5946,
  };

  return isLoaded ? (
    <div className="w-full h-full relative group font-inter">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{...mapOptions, mapTypeId: mapType}}
      >
        {showTraffic && <TrafficLayer />}
        
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={{ lat: listing.lat, lng: listing.lng }}
            onClick={() => setSelectedListing(listing)}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: "#16A34A",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
              scale: 2,
              anchor: new google.maps.Point(12, 24),
            }}
          />
        ))}

        {selectedListing && (
          <InfoWindow
            position={{ lat: selectedListing.lat, lng: selectedListing.lng }}
            onCloseClick={() => setSelectedListing(null)}
          >
            <div className="p-0 max-w-[240px] overflow-hidden rounded-xl bg-white shadow-2xl">
              <div className="relative h-28">
                <img 
                  src={selectedListing.image} 
                  alt={selectedListing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
                  LIVE PREVIEW
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-extrabold text-sm text-text-primary mb-1 line-clamp-1">
                  {selectedListing.title}
                </h4>
                <p className="text-xs text-text-secondary mb-3 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-primary" />
                  {selectedListing.location}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-primary font-black text-sm">{selectedListing.price}</span>
                  <button className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Dynamic Overlay Controls */}
      <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-10">
        <div className="bg-[#0F172A]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-white/10 pointer-events-none">
          <p className="text-[11px] font-black text-primary flex items-center gap-2 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Topographic Center
          </p>
        </div>

        <div className="bg-[#0F172A]/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/10 flex gap-1">
          <button 
            onClick={() => setMapType('roadmap')}
            className={`p-2 rounded-xl transition-all ${mapType === 'roadmap' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-section hover:text-primary'}`}
            title="Map View"
          >
            <MapIcon className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setMapType('satellite')}
            className={`p-2 rounded-xl transition-all ${mapType === 'satellite' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-section hover:text-primary'}`}
            title="Satellite View"
          >
            <Plane className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowTraffic(!showTraffic)}
            className={`p-2 rounded-xl transition-all ${showTraffic ? 'bg-warning text-white shadow-lg' : 'text-text-secondary hover:bg-section hover:text-warning'}`}
            title="Live Traffic"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl max-w-[200px] pointer-events-none">
        <h5 className="text-white text-[10px] font-black uppercase tracking-tighter mb-2 opacity-50">Land Categories</h5>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(22,163,74,0.8)]" />
            <span className="text-white/80 text-[11px] font-bold">Verified Plots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-white/80 text-[11px] font-bold">Industrial Zones</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-3xl border border-border-subtle animate-pulse">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Loading High-Res Data...</p>
    </div>
  );
}

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Logo from "../assets/Logo_company.png";
import locations from "./location";

const IndonesiaMap = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    // Inisialisasi peta dengan gaya custom
    const map = L.map("map", {
      zoomControl: false, // Sembunyikan kontrol zoom default
      attributionControl: false, // Sembunyikan atribusi
      scrollWheelZoom: false
    }).setView([-2.5489, 118.0149], 5);

    // Tambahkan tile layer dengan gaya yang lebih bersih
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

    // Tambahkan kontrol zoom di posisi kanan bawah
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);


    // Gaya untuk marker default dan active
    const defaultIcon = L.icon({
      iconUrl: Logo,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const activeIcon = L.icon({
      iconUrl: Logo,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Buat grup untuk semua marker
    const markersGroup = L.featureGroup().addTo(map);

    // Tambahkan marker untuk setiap lokasi
    const markers = {};
    
    locations.forEach((loc) => {
      // Buat marker dengan transisi CSS untuk efek hover
      const marker = L.marker(loc.coords, { 
        icon: defaultIcon,
        title: loc.name,
        riseOnHover: true
      });
      
      // Buat popup dengan gaya custom
      const popupContent = `
        <div class="custom-popup">
          <h3>${loc.name}</h3>
          ${loc.description ? `<p>${loc.description}</p>` : ''}
        </div>
      `;
      
      const customPopup = L.popup({
        closeButton: false,
        autoClose: false,
        closeOnEscapeKey: false,
        closeOnClick: false,
        className: 'custom-popup-container',
        maxWidth: 250,
        offset: [0, -20]
      }).setContent(popupContent);
      
      // Tambahkan event listener
      marker.on('mouseover', function() {
        this.setIcon(activeIcon);
        this.openPopup();
        setActiveLocation(loc.id);
      });
      
      marker.on('mouseout', function() {
        this.setIcon(defaultIcon);
        this.closePopup();
        setActiveLocation(null);
      });
      
      marker.on('click', function() {
        map.flyTo(loc.coords, 8, {
          animate: true,
          duration: 1.5
        });
      });
      
      marker.bindPopup(customPopup);
      marker.addTo(markersGroup);
      markers[loc.id] = marker;
    });
    
    // Sesuaikan batas peta agar semua marker terlihat
    map.fitBounds(markersGroup.getBounds(), {
      padding: [50, 50]
    });

    // Custom CSS untuk efek hover
    const style = document.createElement('style');
    style.textContent = `
      .custom-popup-container {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        border: none;
      }
      .custom-popup {
        padding: 5px;
        text-align: center;
      }
      .custom-popup h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      .custom-popup p {
        margin: 5px 0 0;
        font-size: 14px;
        color: #666;
      }
      .leaflet-marker-icon {
        transition: all 0.3s ease;
      }
      #map {
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="map-container relative w-full z-10">
      <div id="map" className="w-full h-[300px] md:h-[700px]"></div>
      {activeLocation && (
        <div className="location-info absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md ">
          <p className="font-semibold">{locations.find(loc => loc.id === activeLocation)?.name}</p>
        </div>
      )}
    </div>
  );
};

export default IndonesiaMap;
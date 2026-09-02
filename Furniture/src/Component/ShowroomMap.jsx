import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SHOWROOM_GOOGLE_MAPS_URL, SHOWROOM_POSITION } from '../constants/showroomLocation';
import './ShowroomMap.css';

export default function ShowroomMap() {
  return (
    <div className="showroom-map" aria-label="Interactive map showing the Divine Bliss showroom">
      <MapContainer
        center={SHOWROOM_POSITION}
        zoom={17}
        minZoom={13}
        maxZoom={19}
        zoomControl={false}
        scrollWheelZoom
        doubleClickZoom
        touchZoom
        keyboard
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />

        <CircleMarker
          center={SHOWROOM_POSITION}
          radius={10}
          pathOptions={{ color: '#ffffff', fillColor: '#843a1d', fillOpacity: 1, opacity: 1, weight: 4 }}
        >
          <Tooltip permanent direction="top" offset={[0, -10]} opacity={1} className="showroom-map__tooltip">
            Divine Bliss
          </Tooltip>
          <Popup className="showroom-map__popup" closeButton>
            <strong>Divine Bliss</strong>
            <span>Sy No 07, Garden, Junnasandra, Sarjapur Main Road, Bengaluru, Karnataka 560035</span>
            <a href={SHOWROOM_GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps</a>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

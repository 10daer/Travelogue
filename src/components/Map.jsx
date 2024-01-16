import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import useCities from "../Customs/useCities";
import Button from "./Button";
import { usePosition } from "../hooks/usePosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([30, 50]);
  const [PositionIsLoading, setPositionIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geolocationPosition, setGeolocationPosition] = useState(null);

  const [lat, lng] = usePosition();

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your does not support geolocation");

    setPositionIsLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeolocationPosition([pos.coords.latitude, pos.coords.longitude]);
      setMapPosition([pos.coords.latitude, pos.coords.longitude]);
      setPositionIsLoading(false);
    }),
      (error) => {
        setError(error.message);
        setPositionIsLoading(false);
      };
  }

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {PositionIsLoading ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[+city.position.lat, +city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <HandleClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position, 3);
  return null;
}

function HandleClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

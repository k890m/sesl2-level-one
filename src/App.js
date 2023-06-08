import "./index.css";
import "leaflet/dist/leaflet.css";
import truckData from "./trucks.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

function MapComponent() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

function App() {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [15, 15], // size of the icon
  });

  return (

    <MapContainer center={[37.7749, -122.4149]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <MapComponent/>

      {truckData.map((truck) => {
        if (truck.status === "APPROVED") {
          return (
            <Marker
              key={truck.objectid}
              position={[truck.location.latitude, truck.location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <b>{truck.applicant}</b> <br></br> {truck.address} <br></br>{" "}
                Description: {truck.fooditems}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}

export default App;

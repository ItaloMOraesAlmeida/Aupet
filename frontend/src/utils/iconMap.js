import LeaftLet from "leaflet";
import iconMap from "../images/Icon_Map.svg";

const mapIcon = LeaftLet.icon({
  iconUrl: iconMap,
  iconSize: 50,
  iconAnchor: [25, 50],
  popupAnchor: [160, 15],
});

export default mapIcon;

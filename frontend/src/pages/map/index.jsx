import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./styles.css";

import iconMap from "../../images/Icon_Map.svg";
import mapIcon from "../../utils/iconMap";
import api from "../../services/api";

const Map = () => {
  const [casaAdocao, setCasaAdocao] = useState([]);

  useEffect(() => {
    api.get("/casaadocao").then((dataHouse) => {
      setCasaAdocao(dataHouse.data);
    });
  }, []);

  return (
    <div id="container">
      <aside>
        <header>
          <img src={iconMap} className="logotipo" alt="Logotipo" />

          <h2>Escolha uma casa de adoção no mapa</h2>
          <p>Muitos animais estão esperando seu carinho!</p>
        </header>
      </aside>

      <MapContainer
        center={[-3.7934044, -38.5383735]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {casaAdocao.map((casa) => {
          const { data } = casa;
          return (
            <Marker
              position={[data.latitude, data.longitude]}
              icon={mapIcon}
              key={data.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {data.nome}
                <Link to={`/casaadocao/${data.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Link to="/casaadocao/cadastro" className="new-house">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
};

export default Map;

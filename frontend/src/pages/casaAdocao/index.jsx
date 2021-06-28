import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import Menu from "../../components/Menu";

import "./styles.css";

import mapIcon from "../../utils/iconMap";
import api from "../../services/api";

const CasaAdocao = () => {
  const { id: idCasa } = useParams();
  const [casaAdocaoDetalhes, setCasaAdocaoDetalhes] = useState();
  const [casaAdocaoImagens, setCasaAdocaoImagens] = useState();
  const [imagemAtiva, setImagemAtiva] = useState(0);

  useEffect(() => {
    api.get(`/casaadocao/${idCasa}`).then((dataHouse) => {
      setCasaAdocaoDetalhes(dataHouse.data.data);
      setCasaAdocaoImagens(dataHouse.data.imagens);
    });
  }, [idCasa]);

  if (!casaAdocaoDetalhes || !casaAdocaoImagens) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-casa">
      <Menu />

      <main>
        <div className="casa-detalhes">
          <img
            src={casaAdocaoImagens[imagemAtiva].url}
            alt={casaAdocaoDetalhes.nome}
          />

          <div className="imagens">
            {casaAdocaoImagens.map((imagens, index) => (
              <button
                onClick={() => {
                  setImagemAtiva(index);
                }}
                className={imagemAtiva === index ? "active" : ""}
                type="button"
                key={imagens.id}
              >
                <img src={imagens.url} alt={casaAdocaoDetalhes.nome} />
              </button>
            ))}
          </div>

          <div className="casa-detalhes-content">
            <h1>{casaAdocaoDetalhes.nome}</h1>
            <p>{casaAdocaoDetalhes.sobre}</p>

            <div className="mapa-container">
              <MapContainer
                center={[
                  casaAdocaoDetalhes.latitude,
                  casaAdocaoDetalhes.longitude,
                ]}
                zoom={15}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                    casaAdocaoDetalhes.latitude,
                    casaAdocaoDetalhes.longitude,
                  ]}
                />
              </MapContainer>

              <footer>
                <a
                  target="_blank"
                  without
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${casaAdocaoDetalhes.latitude},${casaAdocaoDetalhes.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{casaAdocaoDetalhes.instrucoes}</p>

            <div className="abrir-detalhes">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {casaAdocaoDetalhes.horario_abertura}
              </div>
              {casaAdocaoDetalhes.final_semana ? (
                <div className="abre-final-semana">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="abre-final-semana vermelho">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <a
              target="_blank"
              without
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=${casaAdocaoDetalhes.telefone}&text=Bom%20dia!`}
              className="botao-contato"
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CasaAdocao;

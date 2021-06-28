import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import Menu from "../../components/Menu";

import "./styles.css";

import mapIcon from "../../utils/iconMap";

const CadastroCasa = () => {
  const history = useHistory();

  const [posicaoMapa, setPosicaoMapa] = useState({ latitude: 0, longitude: 0 });
  const [nome, setNome] = useState("");
  const [sobre, setSobre] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [telefone, setTelefone] = useState("55");
  const [horario_abertura, setHorarioAbertura] = useState("");
  const [final_semana, setAbreFinalSemana] = useState(true);
  const [imagens, setImagens] = useState([]);
  const [imagemVisual, setImagemVisual] = useState([]);

  const clicarMapa = (event) => {
    const { lat, lng } = event.latlng;

    setPosicaoMapa({ latitude: lat, longitude: lng });
  };

  const cadastrar = async (event) => {
    event.preventDefault();

    const { latitude, longitude } = posicaoMapa;

    const data = new FormData();

    data.append("nome", nome);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("sobre", sobre);
    data.append("telefone", telefone);
    data.append("instrucoes", instrucoes);
    data.append("horario_abertura", horario_abertura);
    data.append("final_semana", final_semana);

    imagens.forEach((imagem) => {
      data.append("imagens", imagem);
    });

    await api.post("casaadocao", data);

    alert("cadastro realizado com sucesso!");

    history.push("/mapa");
  };

  const selecionarImagens = (event) => {
    if (!event.target.files) {
      return;
    }

    const arrayImagens = Array.from(event.target.files);

    setImagens(arrayImagens);

    const arrayImagensVisual = arrayImagens.map((dataImagem) => {
      return URL.createObjectURL(dataImagem);
    });

    setImagemVisual(arrayImagensVisual);
  };

  // const removerImagens = () => {
  //   setImagens([]);
  //   setImagemVisual([]);
  // };

  return (
    <div id="pagina-cadastro-casa">
      <Menu />

      <main>
        <form onSubmit={cadastrar} className="cadastro-casa-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-3.7934044, -38.5383735]}
              zoom={15}
              style={{ width: "100%", height: 280 }}
              onclick={clicarMapa}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {posicaoMapa.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[posicaoMapa.latitude, posicaoMapa.longitude]}
                />
              )}
            </MapContainer>

            <div className="input-campo">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-campo">
              <label htmlFor="sobre">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                value={sobre}
                onChange={(e) => setSobre(e.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-campo">
              <label htmlFor="images">Fotos</label>

              <div className="imagens-container">
                {imagemVisual.map((imagem) => {
                  return <img src={imagem} alt={nome} key={imagem} />;
                })}

                <label htmlFor="imagem[]" className="nova-imagem">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={selecionarImagens}
                type="file"
                id="imagem[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-campo">
              <label htmlFor="instrucoes">Instruções</label>
              <textarea
                id="instrucoes"
                value={instrucoes}
                onChange={(e) => setInstrucoes(e.target.value)}
              />
            </div>

            <div className="input-campo">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className="input-campo">
              <label htmlFor="horarioFuncionamento">
                Horário de Funcionamento
              </label>
              <input
                id="horarioFuncionamento"
                value={horario_abertura}
                onChange={(e) => setHorarioAbertura(e.target.value)}
              />
            </div>

            <div className="input-campo">
              <label htmlFor="abreFinalSemana">Atende fim de semana</label>

              <div className="selecao-botao">
                <button
                  type="button"
                  className={final_semana ? "active" : ""}
                  onClick={() => setAbreFinalSemana(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!final_semana ? "active" : ""}
                  onClick={() => setAbreFinalSemana(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="cadastrar-botao" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

export default CadastroCasa;

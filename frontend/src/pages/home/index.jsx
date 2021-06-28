import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import logoImg from "../../images/Logotipo.svg";

import "./styles.css";

const Home = () => (
  <div id="home">
    <div className="content">
      <img src={logoImg} className="logotipo" alt="Logotipo" />

      <main>
        <h1>Adote um animal e o faça feliz!</h1>
        <p>Visite casas de adoção e mude a vida deles!</p>
      </main>

      <div className="developed">
        <strong>Developed By</strong>
        <span>Italo Moraes</span>
      </div>

      <Link to="/mapa" className="button-access">
        <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
      </Link>
    </div>
  </div>
);

export default Home;

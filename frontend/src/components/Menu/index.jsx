import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import iconMap from "../../images/Icon_Map.svg";

import "./styles.css";

const Menu = () => {
  const { goBack } = useHistory();

  return (
    <aside className="menu">
      <img src={iconMap} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default Menu;

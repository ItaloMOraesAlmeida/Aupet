import Sequelize from "sequelize";

import dbConfig from "../config/database";

// Models
import CasaAdocaoModel from "../models/casaAdocao";
import Imagens from "../models/imagens";

const connection = new Sequelize(dbConfig);

CasaAdocaoModel.init(connection);
Imagens.init(connection);

// Associations
CasaAdocaoModel.associate(connection.models);
Imagens.associate(connection.models);

export default connection;

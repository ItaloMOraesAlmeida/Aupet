import { Model, DataTypes } from "sequelize";

class CasaAdocao extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: DataTypes.STRING,
                latitude: DataTypes.DECIMAL,
                longitude: DataTypes.DECIMAL,
                sobre: DataTypes.TEXT,
                telefone: DataTypes.INTEGER,
                instrucoes: DataTypes.TEXT,
                horario_abertura: DataTypes.STRING,
                final_semana: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                tableName: "tb_casa_adocao",
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Imagens, {
            foreignKey: "id_house",
            as: "casa_imagens",
        });
    }
}

export default CasaAdocao;

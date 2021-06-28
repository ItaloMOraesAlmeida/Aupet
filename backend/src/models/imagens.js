import { Model, DataTypes } from "sequelize";

class Imagens extends Model {
    static init(sequelize) {
        super.init(
            {
                local: DataTypes.STRING,
                id_house: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: "tb_imagens",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.CasaAdocao, {
            foreignKey: "id",
            as: "casa_imagens",
        });
    }
}

export default Imagens;

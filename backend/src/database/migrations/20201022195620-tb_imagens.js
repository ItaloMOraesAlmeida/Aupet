module.exports = {
    up: (queryInterface, Sequelize) => {
        const table = queryInterface.createTable("tb_imagens", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            local: {
                type: Sequelize.STRING(200),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo local não pode ser vazio",
                    },
                    len: {
                        args: [1, 200],
                        msg:
                            "Campo local não pode ser menor que 0 e maior que 200",
                    },
                },
            },
            id_house: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: "tb_casa_adocao", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });

        return table;
    },

    down: (queryInterface) => {
        const table = queryInterface.dropTable("tb_imagens");

        return table;
    },
};

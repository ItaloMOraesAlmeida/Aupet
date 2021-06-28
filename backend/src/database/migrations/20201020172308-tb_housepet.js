module.exports = {
    up: (queryInterface, Sequelize) => {
        const table = queryInterface.createTable("tb_casa_adocao", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING(200),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo nome não pode ser vazio",
                    },
                    len: {
                        args: [1, 200],
                        msg:
                            "Campo nome não pode ser menor que 0 e maior que 200",
                    },
                },
            },
            latitude: {
                type: Sequelize.DECIMAL(2, 10),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo latitude não pode ser vazio",
                    },
                },
            },
            longitude: {
                type: Sequelize.DECIMAL(2, 10),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo longitude não pode ser vazio",
                    },
                },
            },
            sobre: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo sobre não pode ser vazio",
                    },
                },
            },
            telefone: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo telefone não pode ser vazio",
                    },
                },
            },
            instrucoes: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo instruções não pode ser vazio",
                    },
                },
            },
            horario_abertura: {
                type: Sequelize.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo horário de abertura não pode ser vazio",
                    },
                    len: {
                        args: [1, 50],
                        msg:
                            "Campo nome não pode ser menor que 0 e maior que 50",
                    },
                },
            },
            final_semana: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo fim de semana não pode ser vazio",
                    },
                },
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });

        return table;
    },

    down: (queryInterface) => {
        const table = queryInterface.dropTable("tb_casa_adocao");

        return table;
    },
};

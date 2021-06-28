require("../../dotenv");

module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    // dialect: process.env.DB_DIALECT,
    dialect: "sqlite",
    storage: "./src/database/database.sqlite",
    // timezone: "America/Fortaleza",
    logging: false,
    define: {
        underscored: false,
        freezeTableName: true,
        timestamps: true,
    },
};

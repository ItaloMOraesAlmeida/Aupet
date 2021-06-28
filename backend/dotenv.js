/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
const dotenv = require("dotenv");

dotenv.config({
    path:
        process.env.NODE_ENV === "dev"
            ? ".env"
            : process.env.NODE_ENV === "prod"
            ? ".env"
            : ".env.test",
});

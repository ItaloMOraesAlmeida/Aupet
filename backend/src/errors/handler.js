/* eslint-disable no-unused-vars */
import { ValidationError } from "yup";

const errorHandler = (error, request, response, next) => {
    const { error: logError } = console;

    if (error instanceof ValidationError) {
        let errors = {};

        error.inner.forEach((err) => {
            errors[err.path] = err.errors;
        });

        return response
            .status(400)
            .json({ message: "validation fails!", errors });
    }

    logError(error);

    return response.status(500).json({ message: "Internal server error!" });
};

export default errorHandler;

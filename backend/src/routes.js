import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import housePetController from "./controller/housePetController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/casaadocao/:id", (request, response) => {
    housePetController.show(request, response);
});

routes.get("/casaadocao", (request, response) => {
    housePetController.list(response);
});

routes.post("/casaadocao", upload.array("imagens"), (request, response) => {
    housePetController.create(request, response);
});

export default routes;

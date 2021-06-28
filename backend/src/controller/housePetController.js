import * as Yup from "yup";

import CasaAdocaoModel from "../models/casaAdocao";
import ImagensModel from "../models/imagens";

import CasaAdocaoView from "../views/casaAdocao";
import ImagemView from "../views/imagensView";

export default {
    async list(response) {
        const housePet = await CasaAdocaoModel.findAll({
            include: [{ association: "casa_imagens" }],
        });

        return response.status(200).json(CasaAdocaoView.renderMany(housePet));
    },

    async show(request, response) {
        const { id } = request.params;

        const housePet = await CasaAdocaoModel.findOne({
            include: [{ association: "casa_imagens" }],
            where: { id },
        });

        return response.status(200).json(CasaAdocaoView.render(housePet));
    },

    async create(request, response) {
        const {
            nome,
            latitude,
            longitude,
            sobre,
            telefone,
            instrucoes,
            horario_abertura,
            final_semana,
        } = request.body;

        const { files } = request;

        const data = {
            nome,
            latitude,
            longitude,
            sobre,
            telefone,
            instrucoes,
            horario_abertura,
            final_semana,
        };

        const schemaHousePet = Yup.object().shape({
            nome: Yup.string().required("Nome é obrigatório!"),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            sobre: Yup.string().required().max(300),
            telefone: Yup.number().required("telefone é obrigatório!"),
            instrucoes: Yup.string().required(),
            horario_abertura: Yup.string().required(),
            final_semana: Yup.boolean().required(),
        });

        const schemaImages = Yup.object().shape({
            local: Yup.string().required(),
            id_house: Yup.number().required(),
        });

        await schemaHousePet
            .validate(data, { abortEarly: false })
            .catch((errorValidate) => {
                const dataValidation = [];
                errorValidate.inner.map((validation) => {
                    dataValidation.push(validation.errors[0]);
                    return null;
                });

                response.status(200).json({
                    error: true,
                    validation: true,
                    dataValidation,
                });
            });
        // abortEarly -> caso um dos objetos estiverem errados, ele já irá retornar um erro
        // O false retirar esse erro para que possa motarar todos os que deram erro

        const housePet = await CasaAdocaoModel.create(data);

        const imagesCreate = files.map(async (images) => {
            const dataImages = {
                local: images.filename,
                id_house: housePet.id,
            };

            await schemaImages
                .validate(dataImages, { abortEarly: false })
                .catch((errorValidate) => {
                    const dataValidation = [];
                    errorValidate.inner.map((validation) => {
                        dataValidation.push(validation.errors[0]);
                        return null;
                    });

                    response.status(200).json({
                        error: true,
                        validation: true,
                        dataValidation,
                    });
                });

            const result = await ImagensModel.create(dataImages);

            return result.dataValues;
        });

        const images = await Promise.all(imagesCreate);

        // Status 201 Significa que algo foi criado
        return response.status(201).json({
            data: CasaAdocaoView.renderOne(housePet),
            images: ImagemView.renderMany(images),
        });
    },
};

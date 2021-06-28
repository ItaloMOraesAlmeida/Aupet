import ImagensView from "./imagensView";

export default {
    renderOne(casaAdocao) {
        return {
            data: {
                id: casaAdocao.id,
                nome: casaAdocao.nome,
                latitude: casaAdocao.latitude,
                longitude: casaAdocao.longitude,
                sobre: casaAdocao.sobre,
                telefone: casaAdocao.telefone,
                instrucoes: casaAdocao.instrucoes,
                horario_abertura: casaAdocao.horario_abertura,
                final_semana: casaAdocao.final_semana,
                createdAt: casaAdocao.createdAt,
                updatedAt: casaAdocao.updatedAt,
            },
        };
    },

    render(casaAdocao) {
        return {
            data: {
                id: casaAdocao.id,
                nome: casaAdocao.nome,
                latitude: casaAdocao.latitude,
                longitude: casaAdocao.longitude,
                sobre: casaAdocao.sobre,
                telefone: casaAdocao.telefone,
                instrucoes: casaAdocao.instrucoes,
                horario_abertura: casaAdocao.horario_abertura,
                final_semana: casaAdocao.final_semana,
                createdAt: casaAdocao.createdAt,
                updatedAt: casaAdocao.updatedAt,
            },
            imagens: ImagensView.renderMany(casaAdocao.casa_imagens),
        };
    },

    renderMany(casaAdocoes) {
        return casaAdocoes.map((casaAdocao) => this.render(casaAdocao));
    },
};

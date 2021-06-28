export default {
    render(imagem) {
        return {
            id: imagem.id,
            url: `http://192.168.21.207:3001/uploads/${imagem.local}`,
        };
    },

    renderMany(imagens) {
        return imagens.map((imagem) => this.render(imagem));
    },
};

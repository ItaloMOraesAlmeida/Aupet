import app from "./index";

app.listen(3001, () => {
    const { log } = console;

    log("API rodando na porta 3001");
});

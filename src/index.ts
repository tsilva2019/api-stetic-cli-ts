import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.get('/', (req, res) => {
        return res.json('Bem vindo a API do Stetic-CLI');
    })

    return app.listen(process.env.PORT,() => console.log(`Servidor online na porta ${process.env.PORT}`))
})
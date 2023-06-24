import bodyParser from 'body-parser';
import express from 'express';
import * as dotenv from 'dotenv'
import userRouter from './controller/userController.js';
import { verifyToken } from './controller/authController.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3200;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);

app.get("/informacoes", verifyToken, (req, res) => {
    let loggedUser = req.user.name;
    let expirationDate = new Date(req.user.exp * 1000).toLocaleString();

    res.send({
        message: `Bem vindo, ${loggedUser}. A sua sessão termina em ${expirationDate}`,
    })
})

app.listen(PORT, function () {
    console.log("Servidor rodando na porta " + PORT);
})

import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        return res.send({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
        return res.status(400).send({ error: "Falha ao registrar usuário ", info: err.message });
    }
});

userRouter.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) {
                    return res.status(400).send({ error: "Usuário não encontrado" });
                }

                bcrypt.compare(req.body.password, user.password, function (err, isValid) {
                    if (err) {
                        return res.status(400).send({ error: err.message });
                    }

                    if (!isValid) {
                        return res.send({ message: "Senha inválida!" });
                    }

                    const token = jwt.sign({
                        name: user.name,
                        email: user.email
                    }, process.env.JWT_SECRET,
                        {
                            expiresIn: '5m'
                        })

                    return res.send({ message: "Logado com sucesso!", token });
                })
            })
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    } else {
        return res.status(400).send({ message: "Falta informações para fazer o login!" });
    }
})

export default userRouter;
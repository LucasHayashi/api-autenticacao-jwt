import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

import { verifyRefreshToken, verifyToken } from "./authController.js";
import { addToBlockList } from "./blockListController.js";
import { generateHashToken, generateJwtToken, generateOpaqueToken } from "./tokenController.js";

const userRouter = Router();

const login = async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err || (!user)) {
                    return res.status(400).send({ error: "Usuário não encontrado" });
                }
                bcrypt.compare(req.body.password, user.password, async function (err, isValid) {
                    if (err) {
                        return res.status(400).send({ error: err.message });
                    }

                    if (!isValid) {
                        /* Validação para quando vier da rota refresh token */
                        if (!req.body.password === user.password) {
                            return res.send({ message: "Senha inválida!" });
                        }
                    }

                    const accessToken = await generateJwtToken(user);
                    const refreshToken = await generateOpaqueToken(user);

                    return res.send({ accessToken, refreshToken });
                })
            })
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    } else {
        return res.status(400).send({ message: "Falta informações para fazer o login!" });
    }
};

const register = async (req, res) => {
    try {
        await User.create(req.body);
        
        return res.send({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
        return res.status(400).send({ error: "Falha ao registrar usuário ", info: err.message });
    }
}

const logout = async (req, res) => {
    try {
        const bearer = req.headers.authorization;
        const bearerToken = bearer.split(" ")[1];
        const loggedUserId = req.user.id;
        const tokenHash = generateHashToken(bearerToken);

        const blockedItem = {
            hash: tokenHash,
            user: loggedUserId
        }

        await addToBlockList(blockedItem);

        return res.send({ message: "Logout efetuado com sucesso!" });
    } catch (err) {
        return res.status(400).send({ error: "Falha ao fazer logout ", info: err.message });
    }
}

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/refresh-token", verifyRefreshToken, login);
userRouter.post("/logout", verifyRefreshToken, verifyToken, logout);

export default userRouter;
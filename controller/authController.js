import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { hasBlockedToken } from './blockListController.js';
import { searchRefreshToken, removeFromAllowList } from './allowListController.js';
import User from '../models/User.js';
dotenv.config();

export const verifyToken = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).send({ message: "Não autorizado!" });
    }

    const bearerToken = bearer.split(" ")[1];

    try {

        const verifyBlockedToken = await hasBlockedToken(bearerToken);

        if (verifyBlockedToken) {
            throw new Error("Token invalidado por Logout!");
        }

        const user = jwt.verify(bearerToken, process.env.JWT_SECRET);

        req.user = user;

        next();
        
    } catch (err) {
        return res.status(401).send({ message: err.message });
    }
}

export const verifyRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).send({ message: "Informe um Refresh Token" });
        }

        const refreshTokenInfo = await searchRefreshToken(refreshToken);

        if (!refreshTokenInfo) {
            return res.status(401).send({ message: "Refresh Token Inválido" });
        }

        const expireTokenDate = new Date(refreshTokenInfo.expiresIn);
        
        await removeFromAllowList(refreshToken);

        if ( expireTokenDate < new Date() ) {
            return res.status(401).send({ message: "O Refresh Token está expirado, faça o login novamente" });
        }

        const user = await User.findOne({ _id: refreshTokenInfo.user });

        req.body = user;

        next();

    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

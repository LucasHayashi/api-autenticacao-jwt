import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import moment from "moment";
import { addToAllowList } from "./allowListController.js";

export async function generateJwtToken(user) {
    if (!user) {
        throw new Error("Invalid User");
    }

    try {
        const { _id, name, email } = user;
        const jwtToken = jwt.sign(
            { id: _id, name, email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        return jwtToken;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function generateOpaqueToken(user) {
    if (!user) {
        throw new Error("Invalid User");
    }

    try {
        const expireDate = moment().add('1', 'day').format();
        const refreshToken = crypto.randomBytes(24).toString('hex');
        const allowedItem = {
            refreshToken: refreshToken,
            user: user.id,
            expiresIn: expireDate
        }

        await addToAllowList(allowedItem);

        return refreshToken;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function generateHashToken(jwtToken) {
    return crypto.createHash("sha256").update(jwtToken).digest("hex");
}
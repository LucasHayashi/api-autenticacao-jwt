import BlockList from "../models/BlockList.js";
import { generateHashToken } from "./tokenController.js";

export const addToBlockList = async (blockedItem) => {
    try {
        await BlockList.create(blockedItem);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const hasBlockedToken = async (jwtToken) => {
    try {
        const hash = generateHashToken(jwtToken);
        const count = await BlockList.countDocuments({ hash });
        return count > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};
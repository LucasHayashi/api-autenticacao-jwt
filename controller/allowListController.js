import AllowList from "../models/AllowList.js";

export const addToAllowList = async (allowedItem) => {
    try {
        await AllowList.create(allowedItem);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const removeFromAllowList = async (refreshToken) => {
    try {
        await AllowList.deleteOne({ refreshToken })
    } catch (error) {
        throw new Error(error.message);
    }
}

export const searchRefreshToken = async (refreshToken) => {
    try {
        return await AllowList.findOne({ refreshToken });
    } catch (error) {
        throw new Error(error.message);
    }
};
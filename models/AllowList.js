import mongoose from "../database/connection.js";

const allowListSchema = new mongoose.Schema({
    refreshToken: { type: "String", required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expiresIn: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const AllowList = mongoose.model("AllowList", allowListSchema);

export default AllowList;
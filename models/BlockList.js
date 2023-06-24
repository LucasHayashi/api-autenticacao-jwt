import mongoose from "../database/connection.js";

const blockListSchema = new mongoose.Schema({
    hash: { type: "String", required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
});

const BlockList = mongoose.model("BlockList", blockListSchema);

export default BlockList;
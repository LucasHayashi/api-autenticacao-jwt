import mongoose from "../database/connection.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true, minLength: 8 },
    createdAt: { type: Date, default: Date.now },
});


userSchema.pre("save", function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;

            next();
        })
    })
})

const User = mongoose.model("User", userSchema);

export default User;
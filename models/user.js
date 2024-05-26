import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"],
    },

    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers!"],
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
    }
    });

const User = models.User || model("User", userSchema);

export default User;
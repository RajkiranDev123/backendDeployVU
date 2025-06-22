import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({

 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
    },


}, { timestamps: true })

export const users = new mongoose.model("users", usersSchema)


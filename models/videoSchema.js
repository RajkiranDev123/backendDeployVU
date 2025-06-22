import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },

        cloudinaryUrl: {
            type: String,
            required: true,
        },

        cloudinaryPublicId: {
            type: String,
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        timestamps: true,
    }
);



export const video = new mongoose.model("video", videoSchema)

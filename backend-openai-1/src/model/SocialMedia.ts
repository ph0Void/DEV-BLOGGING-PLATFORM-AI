import mongoose, { Schema } from "mongoose";

export interface ISocialMediaDocument {
    name: string,
    url: string
}

const socialMediaSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: false, _id: false });

export const SocialMediaModel = mongoose.model<ISocialMediaDocument>("socialMedia", socialMediaSchema);
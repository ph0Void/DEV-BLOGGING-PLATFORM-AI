import mongoose from "mongoose";

export interface IProfile extends Document {
    userId: mongoose.Types.ObjectId;
    nickname: string;
    description?: string;
    website?: string;
    avatarUrl?: string;
}

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export const ProfileModel = mongoose.model<IProfile>("profile", profileSchema);
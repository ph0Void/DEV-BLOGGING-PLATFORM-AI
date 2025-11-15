import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { ISocialMediaDocument, SocialMediaModel } from "./SocialMedia";

export interface IdevTree extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    urlImage?: string;
    socialMedia: ISocialMediaDocument[];
    slug: string;
    available: boolean;
    views?: number;
    likes?: number;
}

const devTreeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        default: null
    },
    socialMedia: {
        type: [SocialMediaModel.schema],
        default: []
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    available: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

devTreeSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

        this.slug = `${this.slug}-${Date.now()}`;
    }
    next();
});

export const DevTreeModel = mongoose.model<IdevTree>("devTree", devTreeSchema);
import mongoose, { Document, Schema } from "mongoose";

export interface Ipost extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    slug: string;
    available: boolean;
    views?: number;
    likes?: number;
}

const postSchema = new Schema({
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
    content: {
        type: String,
        required: true
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

postSchema.pre('save', function (next) {
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

export const PostModel = mongoose.model<Ipost>("post", postSchema);
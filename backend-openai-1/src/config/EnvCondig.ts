import dotenv from 'dotenv';

dotenv.config();

export const EnvConfig = {
    PORT: process.env.PORT!,

    MONGO_URL: process.env.MONGO_URL!,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME!,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    OPENAI_API_URL: process.env.OPENAI_API_URL!,
    OPENAI_MODEL: process.env.OPENAI_MODEL!,

    JWT_SECRET: process.env.JWT_SECRET!,

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL!,
}

import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import { EnvConfig } from './EnvCondig';

cloudinary.config({
    cloud_name: EnvConfig.CLOUDINARY_NAME,
    api_key: EnvConfig.CLOUDINARY_API_KEY,
    api_secret: EnvConfig.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo JPG, PNG o WEBP.'));
        }
    },
});

export { cloudinary };
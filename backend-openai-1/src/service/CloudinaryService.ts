import { cloudinary } from "../config/CloudinaryConfig";

export class CloudinaryService {
    async uploadImage(fileBuffer: Buffer) {
        const result = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads',
                    resource_type: 'image'
                },
                (error, result) => {

                    if (error) {
                        return reject(error);
                    }

                    if (!result) {
                        return reject(new Error('No se pudo subir la imagen a Cloudinary'));
                    }
                    resolve(result);
                }
            );

            uploadStream.end(fileBuffer);
        });

        return result;
    }
}
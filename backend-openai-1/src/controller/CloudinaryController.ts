import { Request, Response } from "express";
import { CloudinaryService } from "../service/CloudinaryService";
import { MessageDto } from "../dto/MessageDto";

export class CloudinaryController {

    async uploadImage(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json(new MessageDto(
                    false,
                    'No se ha proporcionado ningún archivo.'
                ));
            }

            const cloudinaryService = new CloudinaryService();
            const result = await cloudinaryService.uploadImage(req.file.buffer);

            return res.status(200).json(new MessageDto(
                true,
                'Imagen subida correctamente',
                (result as any).secure_url
            ));
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            return res.status(500).json(new MessageDto(
                false,
                'Error al subir la imagen'
            ));
        }
    }


}
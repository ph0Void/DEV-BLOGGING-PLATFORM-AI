import { Request, Response } from "express";
import { CloudinaryService } from "../service/CloudinaryService";
import { ProfileService } from "../service/ProfileService";
import { ICrudController } from "./common/CrudController";
import { GetTokenFromRequest, GetUserByToken } from "../utils/TokenUtils";
import { MessageDto } from "../dto/MessageDto";

export class ProfileController implements ICrudController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async getProfile(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            return res.status(200).json(new MessageDto(
                true,
                "Perfil obtenido",
                { username: user.username, email: user.email }
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al obtener el perfil"
            ));
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            let devtreeData: any = req.body;
            if (req.body.devtree && typeof req.body.devtree === 'string') {
                try {
                    devtreeData = JSON.parse(req.body.devtree);
                } catch (err) {
                    return res.status(400).json(new MessageDto(
                        false,
                        "JSON inválido en el campo 'devtree'"
                    ));
                }
            }

            if (!req.file) {
                return res.status(400).json(new MessageDto(
                    false,
                    'No se ha proporcionado ningún archivo.'
                ));
            }

            const imageResult = await this.cloudinaryService.uploadImage(req.file.buffer);

            const result = await this.profileService.create({
                ...devtreeData,
                userId: user._id!.toString(),
                avatarUrl: (imageResult as any).secure_url
            });

            return res.status(201).json(new MessageDto(
                true,
                "Perfil creado",
                result
            ));


        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al crear el recurso"
            ));
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            let devtreeData: any = req.body;
            if (req.body.devtree && typeof req.body.devtree === 'string') {
                try {
                    devtreeData = JSON.parse(req.body.devtree);
                } catch (err) {
                    return res.status(400).json(new MessageDto(
                        false,
                        "JSON inválido en el campo 'profile'"
                    ));
                }
            }

            if (!req.file) {
                return res.status(400).json(new MessageDto(
                    false,
                    'No se ha proporcionado ningún archivo.'
                ));
            }

            const imageResult = await this.cloudinaryService.uploadImage(req.file.buffer);

            const result = await this.profileService.create({
                ...devtreeData,
                userId: user._id!.toString(),
                avatarUrl: (imageResult as any).secure_url
            });

            return res.status(201).json(new MessageDto(
                true,
                "Perfil creado",
                result
            ));


        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al crear el recurso"
            ));
        }
    }
}
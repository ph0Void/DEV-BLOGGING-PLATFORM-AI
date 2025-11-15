import { Request, Response } from "express";
import { ICrudController } from "./common/CrudController";
import { DevTreeService } from "../service/DevTreeService";
import { GetTokenFromRequest, GetUserByToken } from "../utils/TokenUtils";
import { MessageDto } from "../dto/MessageDto";
import { CloudinaryService } from "../service/CloudinaryService";

interface IDevTreeController extends ICrudController {
    updateAvailability(req: Request, res: Response): Promise<any>;
    findBySlug(req: Request, res: Response): Promise<any>;
    toggleLikeBySlug(req: Request, res: Response): Promise<any>;
}

export class DevTreeController implements IDevTreeController {

    constructor(
        private devTreeService: DevTreeService,
        private cloudinaryService = new CloudinaryService()

    ) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const token = await GetTokenFromRequest(req);

            const user = await GetUserByToken(token);


            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 10;

            const result = await this.devTreeService
                .findAllByUserPaginated(user._id!.toString(), page, size);

            res.status(200).json({
                success: true,
                message: "Recursos obtenidos",
                data: result
            });

        } catch (error: any) {
            res.status(401).json(new MessageDto(
                false,
                "Acceso no autorizado"
            ));
        }
    }


    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.devTreeService.findById(id);

            res.status(200).json(new MessageDto(
                true,
                "Recurso encontrado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al obtener el recurso"
            ));
        }
    }

    async findBySlug(req: Request, res: Response): Promise<any> {
        try {
            const { slug } = req.params;
            const result = await this.devTreeService.findBySlug(slug);

            if (!result) {
                res.status(404).json(new MessageDto(
                    false,
                    "Recurso no encontrado"
                ));
                return;
            }

            if (!result.available) {
                res.status(403).json(new MessageDto(
                    false,
                    "Recurso no disponible"
                ));
                return;
            }

            res.status(200).json(new MessageDto(
                true,
                "Recurso encontrado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al obtener el recurso"
            ));
        }
    }

    async toggleLikeBySlug(req: Request, res: Response): Promise<any> {
        try {
            const { slug } = req.params;
            const result = await this.devTreeService.toggleLikeBySlug(slug);

            if (!result) {
                res.status(404).json(new MessageDto(
                    false,
                    "Recurso no encontrado"
                ));
                return;
            }

            res.status(200).json(new MessageDto(
                true,
                "Recurso actualizado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al actualizar el recurso"
            ));
        }
    }

    async updateAvailability(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            const result = await this.devTreeService.updateAvailability(id);

            if (!result) {
                res.status(404).json(new MessageDto(
                    false,
                    "Recurso no encontrado"
                ));
                return;
            }

            return res.status(200).json(new MessageDto(
                true,
                "Disponibilidad actualizada del recurso " + (result.available ? "a disponible" : "a no disponible"),
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al actualizar la disponibilidad"
            ));
        }
    }

    // recibe solo json sin imagen
    async createData(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            const { ...createData } = req.body;

            const result = await this.devTreeService.create({
                ...createData,
                userId: user._id!.toString()
            });

            return res.status(201).json(new MessageDto(
                true,
                "Recurso creado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al crear el recurso"
            ));
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            //const { ...devtree } = req.body;

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

            console.log((imageResult as any).secure_url);
            const result = await this.devTreeService.create({
                ...devtreeData,
                userId: user._id!.toString(),
                urlImage: (imageResult as any).secure_url
            });

            return res.status(201).json(new MessageDto(
                true,
                "Recurso creado",
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
            const { id } = req.params;
            //const { ...updateData } = req.body;

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


            let urlImage: string | undefined;
            if (req.file) {
                const imageResult = await this.cloudinaryService.uploadImage(req.file.buffer);
                urlImage = (imageResult as any).secure_url;
            }

            const result = await this.devTreeService.update(id, {
                ...devtreeData,
                ...(urlImage && { urlImage })
            });

            if (!result) {
                res.status(404).json(new MessageDto(
                    false,
                    "Recurso no encontrado"
                ));
                return;
            }
            return res.status(200).json(new MessageDto(
                true,
                "Recurso actualizado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al actualizar el recurso"
            ));
        }
    }

    // recibe solo json sin imagen
    async updateData(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { ...updateData } = req.body;

            const result = await this.devTreeService.update(id, updateData);

            if (!result) {
                res.status(404).json(new MessageDto(
                    false,
                    "Recurso no encontrado"
                ));
                return;
            }
            return res.status(200).json(new MessageDto(
                true,
                "Recurso actualizado",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al actualizar el recurso"
            ));
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            await this.devTreeService.delete(id);

            res.status(200).json(new MessageDto(
                true,
                "Recurso eliminado"
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al eliminar el recurso"
            ));
        }
    }
}
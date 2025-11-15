import { Request, Response } from "express";
import { PostService } from "../service/PostService";
import { ICrudController } from "./common/CrudController";
import { GetTokenFromRequest, GetUserByToken } from "../utils/TokenUtils";
import { MessageDto } from "../dto/MessageDto";

interface IPostController extends ICrudController {
    updateAvailability(req: Request, res: Response): Promise<any>;
    findBySlug(req: Request, res: Response): Promise<any>;
    toggleLikeBySlug(req: Request, res: Response): Promise<any>;
}

export class PostController implements IPostController {
    constructor(private readonly postService: PostService) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 10;

            const result = await this.postService.findAllByUserPaginated(user._id!.toString(), page, size);

            res.status(200).json(new MessageDto(
                true,
                "Recursos obtenidos",
                result
            ));
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
            const result = await this.postService.findById(id);

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

    async findRandom(req: Request, res: Response): Promise<any> {
        try {
            const size = parseInt(req.query.size as string) || 3;

            const result = await this.postService.findRandom(size);

            res.status(200).json(new MessageDto(
                true,
                "Recursos aleatorios obtenidos",
                result
            ));
        } catch (error: any) {
            res.status(500).json(new MessageDto(
                false,
                "Error al obtener recursos aleatorios"
            ));
        }
    }

    async findBySlug(req: Request, res: Response): Promise<any> {
        try {
            const { slug } = req.params;
            const result = await this.postService.findBySlug(slug);

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

    async updateAvailability(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            const result = await this.postService.updateAvailability(id);

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

    async toggleLikeBySlug(req: Request, res: Response): Promise<any> {
        try {
            const { slug } = req.params;
            const result = await this.postService.toggleLikeBySlug(slug);

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

    async create(req: Request, res: Response): Promise<any> {
        try {
            const token = await GetTokenFromRequest(req);
            const user = await GetUserByToken(token);

            const { ...createData } = req.body;

            const result = await this.postService.create({
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

    async update(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { ...updateData } = req.body;

            const result = await this.postService.update(id, updateData);

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
            await this.postService.delete(id);

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
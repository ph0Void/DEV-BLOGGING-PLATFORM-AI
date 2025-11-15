import { ChatCompletionTool } from "openai/resources.js";
import { PostService } from "../service/PostService";
import { BaseTool } from "./common/BaseTool";

export class PostTools implements BaseTool {
    private readonly functionNames: string[] = [
        'get_post_by_id',
        'get_post_by_slug',
        'get_all_posts_by_user',
        'create_post',
        'update_post',
        'update_post_availability',
        'delete_post'
    ];

    constructor(
        private readonly postService: PostService
    ) { }

    public getTools(): ChatCompletionTool[] {
        return [
            {
                type: "function",
                function: {
                    name: "get_post_by_id",
                    description: "Obtiene un post por su ID",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del post",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "get_post_by_slug",
                    description: "Obtiene un post por su slug",
                    parameters: {
                        type: "object",
                        properties: {
                            slug: {
                                type: "string",
                                description: "El slug del post",
                            },
                        },
                        required: ["slug"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "get_all_posts_by_user",
                    description: "Obtiene todos los posts de un usuario",
                    parameters: {
                        type: "object",
                        properties: {
                            userId: {
                                type: "string",
                                description: "El ID del usuario",
                            },
                        },
                        required: ["userId"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "create_post",
                    description: "Crea un nuevo post",
                    parameters: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                description: "Título del post",
                            },
                            slug: {
                                type: "string",
                                description: "Slug único del post",
                            },
                            content: {
                                type: "string",
                                description: "Contenido del post",
                            },
                            userId: {
                                type: "string",
                                description: "ID del usuario propietario",
                            },
                        },
                        required: ["title", "slug", "userId"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "update_post",
                    description: "Actualiza un post existente",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "ID del post a actualizar",
                            },
                            title: {
                                type: "string",
                                description: "Título del post",
                            },
                            slug: {
                                type: "string",
                                description: "Slug único del post",
                            },
                            content: {
                                type: "string",
                                description: "Contenido del post",
                            },
                            userId: {
                                type: "string",
                                description: "ID del usuario propietario",
                            },
                        },
                        required: ["id", "title", "slug", "userId"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "update_post_availability",
                    description: "Cambia la disponibilidad de un post",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del post",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "delete_post",
                    description: "Elimina un post",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del post a eliminar",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
        ];
    }

    public canHandle(functionName: string): boolean {
        return this.functionNames.includes(functionName);
    }

    public async executeTools(
        functionName: string,
        args: any
    ) {
        try {
            let result: any;

            switch (functionName) {
                case "get_post_by_id":
                    result = await this.postService.findById(args.id);
                    break;

                case "get_post_by_slug":
                    result = await this.postService.findBySlug(args.slug);
                    break;

                case "get_all_posts_by_user":
                    result = await this.postService.findAllByUser(args.userId);
                    break;

                case "create_post":
                    result = await this.postService.create(args);
                    break;

                case "update_post":
                    result = await this.postService.update(args.id, args);
                    break;

                case "update_post_availability":
                    result = await this.postService.updateAvailability(args.id);
                    break;

                case "delete_post":
                    result = await this.postService.delete(args.id);
                    break;

                default:
                    throw new Error(`Función no reconocida: ${functionName}`);
            }

            return JSON.stringify(result);
        } catch (error: any) {
            return JSON.stringify({ error: error.message });
        }
    }
}
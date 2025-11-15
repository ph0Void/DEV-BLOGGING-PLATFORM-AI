import { ChatCompletionTool } from 'openai/resources/chat/completions';
import { DevTreeService } from '../service/DevTreeService';
import { BaseTool } from './common/BaseTool';

export class DevTreeTool implements BaseTool {
    private readonly functionNames: string[] = [
        'get_devtree_by_id',
        'get_devtree_by_slug',
        'get_all_devtrees_by_user',
        'create_devtree',
        'update_devtree',
        'update_devtree_availability',
        'delete_devtree'
    ];

    constructor(
        private readonly devTreeService: DevTreeService
    ) { }

    public getTools(): ChatCompletionTool[] {
        return [
            {
                type: "function",
                function: {
                    name: "get_devtree_by_id",
                    description: "Obtiene un DevTree por su ID",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del DevTree",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "get_devtree_by_slug",
                    description: "Obtiene un DevTree por su slug",
                    parameters: {
                        type: "object",
                        properties: {
                            slug: {
                                type: "string",
                                description: "El slug del DevTree",
                            },
                        },
                        required: ["slug"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "get_all_devtrees_by_user",
                    description: "Obtiene todos los DevTrees de un usuario",
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
                    name: "create_devtree",
                    description: "Crea un nuevo DevTree",
                    parameters: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                description: "Título del DevTree",
                            },
                            slug: {
                                type: "string",
                                description: "Slug único del DevTree",
                            },
                            description: {
                                type: "string",
                                description: "Descripción del DevTree",
                            },
                            userId: {
                                type: "string",
                                description: "ID del usuario propietario",
                            },
                        },
                        required: ["name", "slug", "userId"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "update_devtree",
                    description: "Actualiza un DevTree existente",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "ID del DevTree a actualizar",
                            },
                            title: {
                                type: "string",
                                description: "Título del DevTree",
                            },
                            slug: {
                                type: "string",
                                description: "Slug único del DevTree",
                            },
                            description: {
                                type: "string",
                                description: "Descripción del DevTree",
                            },
                            userId: {
                                type: "string",
                                description: "ID del usuario propietario",
                            },
                        },
                        required: ["name", "slug", "userId"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "update_devtree_availability",
                    description: "Cambia la disponibilidad de un DevTree",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del DevTree",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "delete_devtree",
                    description: "Elimina un DevTree",
                    parameters: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                description: "El ID del DevTree a eliminar",
                            },
                        },
                        required: ["id"],
                    },
                },
            },
        ];
    }

    // Verifica si esta tool puede manejar la función
    public canHandle(functionName: string): boolean {
        return this.functionNames.includes(functionName);
    }

    // Ejecuta la función llamada por OpenAI
    public async executeTools(
        functionName: string,
        args: any
    ) {
        try {
            let result: any;

            switch (functionName) {
                case "get_devtree_by_id":
                    result = await this.devTreeService.findById(args.id);
                    break;

                case "get_devtree_by_slug":
                    result = await this.devTreeService.findBySlug(args.slug);
                    break;

                case "get_all_devtrees_by_user":
                    result = await this.devTreeService.findAllByUser(args.userId);
                    break;

                case "create_devtree":
                    result = await this.devTreeService.create(args);
                    break;

                case "update_devtree":
                    result = await this.devTreeService.update(args.id, args);
                    break;

                case "update_devtree_availability":
                    result = await this.devTreeService.updateAvailability(args.id);
                    break;

                case "delete_devtree":
                    result = await this.devTreeService.delete(args.id);
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
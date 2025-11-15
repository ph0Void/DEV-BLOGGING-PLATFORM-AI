import { Request, Response } from "express";
import { ChatBotService } from "../service/ChatBotService";
import { GetTokenFromRequest, GetUserByToken } from "../utils/TokenUtils";
import { MessageDto } from "../dto/MessageDto";

export class ChatBotController {
    constructor(
        private readonly chatBotService: ChatBotService,
    ) { }

    async simpleChat(req: Request, res: Response) {
        try {
            const { message } = req.body;

            const result = await this.chatBotService.simpleChatProcess(message);

            return res.status(200).json(new MessageDto(
                true,
                "Mensaje procesado correctamente",
                result.response
            ));

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: "Error al procesar el chat",
                details: error.message,
            });
        }
    }

    async processChat(req: Request, res: Response) {
        try {
            const { message, conversationHistory = [] } = req.body;

            if (!message || typeof message !== 'string' || message.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: "El mensaje es requerido y debe ser un texto válido",
                });
            }

            const token = await GetTokenFromRequest(req);
            const userToken = await GetUserByToken(token);
            const { password, ...rest } = userToken;

            const newPromt = `
                Contexto del usuario autenticado:
                - ID: ${rest._id}
                - Username: ${rest.username}
                - Email: ${rest.email}
                - Role: ${rest.role || 'USER'}
                
                Mensaje del usuario: ${message}
            `;

            const result = await this.chatBotService.processMessage(
                newPromt,
                // conversationHistory
            );

            return res.status(200).json(new MessageDto(
                true,
                "Mensaje procesado correctamente",
                result.response
            ));

        } catch (error: any) {
            console.error("Error en chat:", error);

            return res.status(500).json({
                success: false,
                error: "Error al procesar el chat",
                details: error.message,
            });
        }
    }
}
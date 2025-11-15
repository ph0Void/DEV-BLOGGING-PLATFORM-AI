import { NextFunction, Request, Response } from "express";
import { GetTokenFromRequest } from "../../utils/TokenUtils";
import { JwtAdapter } from "../../utils/JwtAdapter";
import { UserRepository } from "../../repository/UserRepository";
import { MessageDto } from "../../dto/MessageDto";

export class AuthMiddleware {
    static async validateToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await GetTokenFromRequest(req);

            const payload: any = await JwtAdapter.validateToken<{ username: string }>(token);

            if (!payload) {
                res.status(401).json(new MessageDto(
                    false,
                    "Token de autenticación inválido"
                ));
                return;
            }

            const userRepository = new UserRepository();

            const user = await userRepository.findByName(payload.username);

            if (!user) {
                res.status(401).json(new MessageDto(
                    false,
                    "Usuario no encontrado"
                ));
                return;
            }

            console.log("Usuario Autenticado");
            console.log(user);

            next();
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: "Acceso no autorizado - Middleware"
            });
        }
    }
}
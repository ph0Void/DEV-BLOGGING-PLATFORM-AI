import { Request } from "express";
import { JwtAdapter } from "./JwtAdapter";
import { UserRepository } from "../repository/UserRepository";

export async function GetUserByToken(token: string) {
    try {
        const payload: any = await JwtAdapter.validateToken<{ username: string }>(token);

        if (!payload) {
            throw new Error("Token de autenticación inválido");
        }

        const userRepository = new UserRepository();

        const user = await userRepository.findByName(payload.username);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    } catch (error) {
        throw new Error("Error en la validación del token");
    }
}

export async function GetTokenFromRequest(req: Request) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new Error("No se proporcionó el encabezado de autorización");
        }

        if (!authorizationHeader.startsWith('Bearer ')) {
            throw new Error("Formato de token inválido");
        }

        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            throw new Error("Token no proporcionado");
        }
        return token;
    } catch (error) {
        throw new Error("Error al obtener el token de la solicitud");
    }
}    
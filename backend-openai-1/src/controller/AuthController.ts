import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { JwtAdapter } from "../utils/JwtAdapter";
import { MessageDto } from "../dto/MessageDto";

export interface IAuthController {
    loginAccount(req: Request, res: Response): Promise<any>;
    registerAccount(req: Request, res: Response): Promise<any>;
    loggoutAccount(req: Request, res: Response): Promise<any>;
}

export class AuthController implements IAuthController {

    constructor(private readonly authService: AuthService) { }

    async loginAccount(req: Request, res: Response): Promise<any> {
        try {
            const loginDto = req.body;
            const result = await this.authService.loginAccount(loginDto);

            const tokenString = await JwtAdapter.generateToken({
                username: result.username,
                email: result.email,
            });

            return res.status(200).json(
                new MessageDto(
                    true,
                    "Login exitoso",
                    tokenString
                )
            );
        } catch (error: any) {
            return res.status(500).json(new MessageDto(
                false,
                error.message
            ));
        }
    }

    async registerAccount(req: Request, res: Response): Promise<any> {
        try {
            const registerDto = req.body;
            const result = await this.authService.registerAccount(registerDto);

            const tokenString = await JwtAdapter.generateToken({
                username: result.username,
                email: result.email,
            });

            return res.status(201).json(
                new MessageDto(
                    true,
                    "Registro exitoso",
                    tokenString
                )
            );
        } catch (error: any) {
            return res.status(500).json(new MessageDto(
                false,
                error.message
            ));
        }
    }

    async loggoutAccount(req: Request, res: Response): Promise<any> {
        try {
            // const result = await this.authService.logout();
            return res.status(204).json(
                new MessageDto(
                    true,
                    "Logout exitoso"
                )
            );
        } catch (error: any) {
            return res.status(500).json(new MessageDto(
                false,
                error.message
            ));
        }
    }

}
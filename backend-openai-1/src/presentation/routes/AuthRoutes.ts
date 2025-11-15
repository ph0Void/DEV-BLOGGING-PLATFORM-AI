import { Router } from "express";
import { UserRepository } from "../../repository/UserRepository";
import { AuthService } from "../../service/AuthService";
import { AuthController } from "../../controller/AuthController";


const authRepository = new UserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export const authRoutes = Router();

authRoutes.post(
    "/login",
    authController.loginAccount.bind(authController)
);

authRoutes.post(
    "/register",
    authController.registerAccount.bind(authController)
);

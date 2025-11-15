import express from "express";
import { privateDevTreeRoutes, publicDevTreeRouter } from "./routes/DevTreeRoutes";
import { authRoutes } from "./routes/AuthRoutes";
import { privatePostRoutes, publicPostRoutes } from "./routes/PostRoutes";
import { chatBotRoutes } from "./routes/ChatBotRoutes";
import { cloudinaryRoutes } from "./routes/CloudinaryRoutes";
import { profileRoutes } from "./routes/ProfileRoute";

export class ServerApp {
    public static start() {
        const app = express();

        app.use(express.json());

        app.use((req, res, next) => {
            console.log(`DIRECCION:  ${req.method} -   DATOS:  ${req.path}`, req.body);
            next();
        });

        // rutas públicas
        app.use('/auth', authRoutes);

        app.use('/public/devtree', publicDevTreeRouter);
        app.use('/public/post', publicPostRoutes);

        // rutas privadas
        app.use('/devtree', privateDevTreeRoutes);
        app.use('/post', privatePostRoutes);
        app.use('/chat', chatBotRoutes);
        app.use('/images', cloudinaryRoutes);
        app.use('/profile', profileRoutes);

        return app;
    }
}
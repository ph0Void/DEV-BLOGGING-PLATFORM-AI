import { Router } from "express";
import { PostController } from "../../controller/PostController";
import { PostRepository } from "../../repository/PostRepository";
import { PostService } from "../../service/PostService";
import { AuthMiddleware } from "../middlerware/AuthMiddleware";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

/** RUTAS PRIVADAS DE POST */
export const privatePostRoutes = Router();

privatePostRoutes.use(AuthMiddleware.validateToken);

privatePostRoutes.get(
    "/",
    postController.getAll.bind(postController)
);

privatePostRoutes.get(
    "/:id",
    postController.getById.bind(postController)
);

privatePostRoutes.patch(
    "/availability/:id",
    postController.updateAvailability.bind(postController)
);

privatePostRoutes.delete(
    "/:id",
    postController.delete.bind(postController)
);

privatePostRoutes.put(
    "/:id",
    postController.update.bind(postController)
);

privatePostRoutes.post(
    "/",
    postController.create.bind(postController)
);

/** RUTAS PÚBLICAS DE POST */
export const publicPostRoutes = Router();

publicPostRoutes.get(
    "/slug/:slug",
    postController.findBySlug.bind(postController)
);

publicPostRoutes.patch(
    "/like/slug/:slug",
    postController.toggleLikeBySlug.bind(postController)
);

publicPostRoutes.get(
    "/random",
    postController.findRandom.bind(postController)
);
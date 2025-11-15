import { Router } from "express";
import { DevTreeRepository } from "../../repository/DevTreeRepository";
import { DevTreeService } from "../../service/DevTreeService";
import { DevTreeController } from "../../controller/DevTreeController";
import { AuthMiddleware } from "../middlerware/AuthMiddleware";
import { cloudinary, upload } from "../../config/CloudinaryConfig";

const devTreeRepository = new DevTreeRepository();
const devTreeService = new DevTreeService(devTreeRepository);
const devTreeController = new DevTreeController(devTreeService);


/** RUTAS PRIVADAS DE DEV TREE */
export const privateDevTreeRoutes = Router();

privateDevTreeRoutes.use(AuthMiddleware.validateToken);

privateDevTreeRoutes.get(
    "/",
    devTreeController.getAll.bind(devTreeController)
);

privateDevTreeRoutes.get(
    "/:id",
    devTreeController.getById.bind(devTreeController)
);

privateDevTreeRoutes.patch(
    "/availability/:id",
    devTreeController.updateAvailability.bind(devTreeController)
);

privateDevTreeRoutes.delete(
    "/:id",
    devTreeController.delete.bind(devTreeController)
);

privateDevTreeRoutes.put(
    "/:id",
    upload.single('file'),
    devTreeController.update.bind(devTreeController)
);

privateDevTreeRoutes.post(
    "/",
    upload.single('file'),
    devTreeController.create.bind(devTreeController)
);

/** RUTAS PÚBLICAS DE DEV TREE */
export const publicDevTreeRouter = Router();

publicDevTreeRouter.get(
    "/slug/:slug",
    devTreeController.findBySlug.bind(devTreeController)
);

publicDevTreeRouter.patch(
    "/like/slug/:slug",
    devTreeController.toggleLikeBySlug.bind(devTreeController)
);
import { Router } from "express";
import { CloudinaryController } from "../../controller/CloudinaryController";
import { AuthMiddleware } from "../middlerware/AuthMiddleware";
import { upload } from "../../config/CloudinaryConfig";

const cloudinaryController = new CloudinaryController();

export const cloudinaryRoutes = Router();

cloudinaryRoutes.use(AuthMiddleware.validateToken);

cloudinaryRoutes.post(
    "/upload",
    upload.single("file"),
    cloudinaryController.uploadImage.bind(cloudinaryController)
)
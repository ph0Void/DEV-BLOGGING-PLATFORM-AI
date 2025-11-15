import { Router } from "express";
import { ProfileController } from "../../controller/ProfileController";
import { ProfileRepository } from "../../repository/ProfileRepository";
import { CloudinaryService } from "../../service/CloudinaryService";
import { ProfileService } from "../../service/ProfileService";
import { AuthMiddleware } from "../middlerware/AuthMiddleware";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
const cloudinaryService = new CloudinaryService();

const profileController = new ProfileController(profileService, cloudinaryService);

export const profileRoutes = Router();

profileRoutes.use(AuthMiddleware.validateToken);

profileRoutes.get(
    "/me",
    profileController.getProfile.bind(profileController)
);

profileRoutes.post(
    "/",
    profileController.create.bind(profileController)
);

profileRoutes.put(
    "/:id",
    profileController.update.bind(profileController)
);
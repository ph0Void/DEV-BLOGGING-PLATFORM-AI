import { Router } from "express";
import { ChatBotController } from "../../controller/ChatBotController";
import { ChatBotService } from "../../service/ChatBotService";
import { DevTreeRepository } from "../../repository/DevTreeRepository";
import { DevTreeService } from "../../service/DevTreeService";
import { PostRepository } from "../../repository/PostRepository";
import { PostService } from "../../service/PostService";
import { AuthMiddleware } from "../middlerware/AuthMiddleware";

const devTreeRepository = new DevTreeRepository();
const devTreeService = new DevTreeService(devTreeRepository);

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

const chatService = new ChatBotService(postService, devTreeService);
const chatController = new ChatBotController(chatService);

export const chatBotRoutes = Router();

chatBotRoutes.use(AuthMiddleware.validateToken);

chatBotRoutes.post(
    "/assistant-agent",
    chatController.processChat.bind(chatController)
);

chatBotRoutes.post(
    "/assistant",
    chatController.simpleChat.bind(chatController)
);
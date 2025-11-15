import { Ipost, PostModel } from "../model/Post";
import { ICrudRepository } from "./common/CrudRepository";
import mongoose from "mongoose";

interface IPostRepository extends ICrudRepository<Ipost, string> {
    findAllByUserId(userId: string): Promise<Ipost[]>;
    findBySlug(slug: string): Promise<Ipost | null>;
    updateAvailability(id: string, available: boolean): Promise<Ipost | null>;

    findAllByUserIdPaginated(userId: string, skip: number, limit: number): Promise<Ipost[]>;
    countByUserId(userId: string): Promise<number>;
}

export class PostRepository implements IPostRepository {

    async findById(id: string): Promise<Ipost | null> {
        const objectId = new mongoose.Types.ObjectId(id);
        const post = await PostModel.findById(objectId).exec();

        return post ? post : null;
    }

    async findAllByUserId(userId: string): Promise<Ipost[]> {
        const objectId = new mongoose.Types.ObjectId(userId);
        const posts = await PostModel.find({ userId: objectId }).exec();
        return posts;
    }

    async findRandom(size: number = 3, onlyAvailable: boolean = true) {
        const pipeline: any[] = [];
        if (onlyAvailable) {
            pipeline.push({ $match: { available: true } });
        }
        pipeline.push({ $sample: { size } });

        // aggregate devuelve documentos sin métodos de mongoose; castear a Ipost[] si es necesario
        const results = await PostModel.aggregate(pipeline).exec();
        return results as unknown as Ipost[];
    }

    async findAllByUserIdPaginated(userId: string, skip: number, limit: number): Promise<Ipost[]> {
        const objectId = new mongoose.Types.ObjectId(userId);
        const posts = await PostModel.find({ userId: objectId })
            .skip(skip)
            .limit(limit)
            .exec();

        return posts;
    }
    async countByUserId(userId: string): Promise<number> {
        const objectId = new mongoose.Types.ObjectId(userId);
        const count = await PostModel.countDocuments({ userId: objectId }).exec();
        return count;
    }

    async findBySlug(slug: string): Promise<Ipost | null> {
        const post = await PostModel.findOne({ slug }).exec();

        return post ? post : null;
    }

    async create(entity: Partial<Ipost>): Promise<Ipost> {
        const objectId = new mongoose.Types.ObjectId(entity.userId);
        const newPost = new PostModel({
            ...entity,
            userId: objectId
        });
        return newPost.save();
    }

    async updateAvailability(id: string, available: boolean): Promise<Ipost | null> {
        const objectId = new mongoose.Types.ObjectId(id);

        const updatedPost = await PostModel.findByIdAndUpdate(
            objectId,
            { available },
            { new: true }
        ).exec();

        return updatedPost ? updatedPost : null;
    }

    async update(id: string, entity: Partial<Ipost>): Promise<Ipost | null> {
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedPost = await PostModel.findByIdAndUpdate(
            objectId,
            entity,
            { new: true }
        ).exec();

        return updatedPost ? updatedPost : null;
    }

    async delete(id: string): Promise<void> {
        const objectId = new mongoose.Types.ObjectId(id);
        await PostModel.findByIdAndDelete(objectId).exec();
    }
}
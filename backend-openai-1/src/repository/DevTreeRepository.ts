import { DevTreeModel, IdevTree } from "../model/DevTree";
import { ICrudRepository } from "./common/CrudRepository";
import mongoose from "mongoose";

interface IDevTreeRepository extends ICrudRepository<IdevTree, string> {
    findAllByUserId(userId: string): Promise<IdevTree[]>;
    findBySlug(slug: string): Promise<IdevTree | null>;
    updateAvailability(id: string, available: boolean): Promise<IdevTree | null>;

    findAllByUserIdPaginated(userId: string, skip: number, limit: number): Promise<IdevTree[]>;
    countByUserId(userId: string): Promise<number>;
}

export class DevTreeRepository implements IDevTreeRepository {

    async findById(id: string): Promise<IdevTree | null> {
        const objectId = new mongoose.Types.ObjectId(id);
        const devTree = await DevTreeModel.findById(objectId).exec();

        return devTree ? devTree : null;
    }

    async findAllByUserId(userId: string): Promise<IdevTree[]> {
        const objectId = new mongoose.Types.ObjectId(userId);
        const devTrees = await DevTreeModel.find({ userId: objectId }).exec();
        return devTrees;
    }

    async findAllByUserIdPaginated(userId: string, skip: number, limit: number): Promise<IdevTree[]> {
        const objectId = new mongoose.Types.ObjectId(userId);
        const devTrees = await DevTreeModel.find({ userId: objectId })
            .skip(skip)
            .limit(limit)
            .exec();
        return devTrees;
    }

    async countByUserId(userId: string) {
        const objectId = new mongoose.Types.ObjectId(userId);
        const count = await DevTreeModel.countDocuments({ userId: objectId }).exec();
        return count;
    }

    async findBySlug(slug: string): Promise<IdevTree | null> {
        const devTree = await DevTreeModel.findOne({ slug }).exec();

        return devTree ? devTree : null;
    }

    async create(entity: Partial<IdevTree>): Promise<IdevTree> {
        const objectId = new mongoose.Types.ObjectId(entity.userId);
        const newDevTree = new DevTreeModel({
            ...entity,
            userId: objectId
        });
        return newDevTree.save();
    }

    async updateAvailability(id: string, available: boolean): Promise<IdevTree | null> {
        const objectId = new mongoose.Types.ObjectId(id);

        const updatedDevTree = await DevTreeModel.findByIdAndUpdate(
            objectId,
            { available },
            { new: true }
        ).exec();

        return updatedDevTree ? updatedDevTree : null;
    }

    async update(id: string, entity: Partial<IdevTree>): Promise<IdevTree | null> {
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedDevTree = await DevTreeModel.findByIdAndUpdate(
            objectId,
            entity,
            { new: true }
        ).exec();

        return updatedDevTree ? updatedDevTree : null;
    }

    async delete(id: string): Promise<void> {
        const objectId = new mongoose.Types.ObjectId(id);
        await DevTreeModel.findByIdAndDelete(objectId).exec();
    }
}
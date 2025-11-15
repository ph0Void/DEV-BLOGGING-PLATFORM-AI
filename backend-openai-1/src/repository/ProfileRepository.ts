import mongoose from "mongoose";
import { IProfile, ProfileModel } from "../model/Profile";
import { ICrudRepository } from "./common/CrudRepository";

interface IProfileRepository extends ICrudRepository<IProfile, string> {
    findByUserId(userId: string): Promise<IProfile | null>;
}

export class ProfileRepository implements IProfileRepository {

    async findByUserId(userId: string) {
        const objectId = new mongoose.Types.ObjectId(userId);
        const result = await ProfileModel.findOne({ userId: objectId }).exec();
        return result ? result : null;
    }

    async findById(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await ProfileModel.findById(objectId).exec();
        return result ? result : null;
    }

    async create(entity: Partial<IProfile>) {
        const objectId = new mongoose.Types.ObjectId(entity.userId);
        const newProfile = new ProfileModel({
            ...entity,
            userId: objectId
        });
        return newProfile.save();
    }

    async update(id: string, entity: Partial<IProfile>) {
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            objectId,
            entity,
            { new: true }
        ).exec();

        return updatedProfile ? updatedProfile : null;
    }

    async delete(id: string) {
        const objectId = new mongoose.Types.ObjectId(id);
        await ProfileModel.findByIdAndDelete(objectId).exec();
    }
}
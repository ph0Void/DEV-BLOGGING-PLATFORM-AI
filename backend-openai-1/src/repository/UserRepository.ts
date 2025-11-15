import { User, UserModel } from "../model/User";
import { ICrudRepository } from "./common/CrudRepository";

interface IUserRepository extends ICrudRepository<User, string> {
    findByName(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {

    async findByName(username: string): Promise<User | null> {
        const user = await UserModel.findOne({ username }).lean().exec();

        return user ? user as User : null;
    }

    async create(entity: Partial<User>) {
        const newUser = new UserModel(entity);
        const savedUser = await newUser.save();

        return savedUser as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).lean().exec();

        return user ? user as User : null;
    }

}
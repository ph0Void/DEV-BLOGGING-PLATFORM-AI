import { DevTreeDto } from "../dto/DevTreeDto";
import { DevTreeRepository } from "../repository/DevTreeRepository";
import { ICrudService } from "./common/CrudService";

interface IDevTreeService extends ICrudService<DevTreeDto, string> {
    findAllByUser(userId: string): Promise<DevTreeDto[]>;
    findBySlug(slug: string): Promise<DevTreeDto | null>;
    updateAvailability(id: string): Promise<DevTreeDto | null>;
    toggleLikeBySlug(slug: string): Promise<DevTreeDto | null>;

    findAllByUserPaginated(userId: string, page: number, size: number): Promise<any>;
}

export class DevTreeService implements IDevTreeService {

    constructor(private devTreeRepository: DevTreeRepository) { }

    async findById(id: string): Promise<DevTreeDto | null> {
        return this.devTreeRepository.findById(id)
            .then(devTree => devTree ? DevTreeDto.toDto(devTree) : null);
    }

    async findAllByUserPaginated(userId: string, page: number, size: number) {
        const skip = (page - 1) * size;
        const [devTrees, total] = await Promise.all([
            this.devTreeRepository.findAllByUserIdPaginated(userId, skip, size),
            this.devTreeRepository.countByUserId(userId)
        ]);
        const data = devTrees.map(devTree => DevTreeDto.toDto(devTree));
        return {
            content: data,
            total,
            page,
            size
        };
    }

    async findAllByUser(userId: string): Promise<DevTreeDto[]> {
        return this.devTreeRepository.findAllByUserId(userId)
            .then(devTrees => devTrees.map(devTree => DevTreeDto.toDto(devTree)));
    }

    async findBySlug(slug: string): Promise<DevTreeDto | null> {
        return this.devTreeRepository.findBySlug(slug)
            .then(devtree => this.devTreeRepository.update(devtree?.id, {
                views: (devtree?.views || 0) + 1
            }))
            .then(devTree => devTree ? DevTreeDto.toDto(devTree) : null);
    }

    async toggleLikeBySlug(slug: string): Promise<DevTreeDto | null> {
        return this.devTreeRepository.findBySlug(slug)
            .then(devTree => {
                if (!devTree) return null;
                devTree.likes = (devTree.likes || 0) + 1;
                return this.devTreeRepository.update(devTree.id, { likes: devTree.likes })
                    .then(updatedDevTree => updatedDevTree ? DevTreeDto.toDto(updatedDevTree) : null);
            });
    }

    async create(entity: Partial<DevTreeDto>): Promise<DevTreeDto> {
        if (!entity.urlImage) {
            entity.urlImage = "https://res.cloudinary.com/dkd37ttep/image/upload/v1757258364/kft4hp7sxtym0s7voynl.png";
        }

        return this.devTreeRepository.create(entity)
            .then(devTree => DevTreeDto.toDto(devTree));
    }

    async updateAvailability(id: string): Promise<DevTreeDto | null> {
        return this.devTreeRepository.findById(id)
            .then(async (devTree) => {
                if (!devTree) {
                    throw new Error("Recurso no encontrado");
                }

                devTree.available = !devTree.available;

                return this.devTreeRepository.updateAvailability(id, devTree.available)
                    .then(devTree => devTree ? DevTreeDto.toDto(devTree) : null);
            });
    }

    async update(id: string, data: DevTreeDto) {
        return this.devTreeRepository.update(id, data)
            .then(devTree => devTree ? DevTreeDto.toDto(devTree) : null);
    }

    async delete(id: string) {
        return this.devTreeRepository.delete(id);
    }
}   
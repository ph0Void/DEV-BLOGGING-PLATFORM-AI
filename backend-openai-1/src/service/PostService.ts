import { PostDto } from "../dto/PostDto";
import { PostRepository } from "../repository/PostRepository";
import { ICrudService } from "./common/CrudService";

interface IPostService extends ICrudService<PostDto, string> {
    findAllByUser(userId: string): Promise<PostDto[]>;
    findBySlug(slug: string): Promise<PostDto | null>;
    updateAvailability(id: string, available: boolean): Promise<PostDto | null>;
    toggleLikeBySlug(slug: string): Promise<PostDto | null>;

    findAllByUserPaginated(userId: string, page: number, size: number): Promise<any>;
}

export class PostService implements IPostService {

    constructor(private readonly postRepository: PostRepository) { }

    async findById(id: string): Promise<PostDto | null> {
        return this.postRepository.findById(id)
            .then(post => post ? PostDto.toDto(post) : null);
    }

    async findAllByUser(userId: string): Promise<PostDto[]> {
        return this.postRepository.findAllByUserId(userId)
            .then(posts => posts.map(post => PostDto.toDto(post)));
    }

    async findAllByUserPaginated(userId: string, page: number, size: number) {
        const skip = (page - 1) * size;
        const [posts, total] = await Promise.all([
            this.postRepository.findAllByUserIdPaginated(userId, skip, size),
            this.postRepository.countByUserId(userId)
        ]);
        const data = posts.map(post => PostDto.toDto(post));
        return { content: data, total, page, size };
    }

    async findRandom(size: number = 3, onlyAvailable: boolean = true) {
        return this.postRepository.findRandom(size, onlyAvailable)
            .then(posts => posts.map(post => PostDto.toDto(post)));
    }

    async findBySlug(slug: string): Promise<PostDto | null> {
        return this.postRepository.findBySlug(slug)
            .then(post => this.postRepository.update(post?.id, {
                views: (post?.views || 0) + 1
            }))
            .then(post => post ? PostDto.toDto(post) : null);
    }

    async toggleLikeBySlug(slug: string): Promise<PostDto | null> {
        return this.postRepository.findBySlug(slug)
            .then(post => {
                if (!post) return null;
                post.likes = (post.likes || 0) + 1;
                return this.postRepository.update(post.id, { likes: post.likes })
                    .then(updatedPost => updatedPost ? PostDto.toDto(updatedPost) : null);
            });
    }

    async create(entity: Partial<PostDto>): Promise<PostDto> {

        return this.postRepository.create(entity)
            .then(post => PostDto.toDto(post));
    }

    async updateAvailability(id: string): Promise<PostDto | null> {
        return this.postRepository.findById(id)
            .then(async (devTree) => {
                if (!devTree) {
                    throw new Error("Recurso no encontrado");
                }

                devTree.available = !devTree.available;

                return this.postRepository.updateAvailability(id, devTree.available)
                    .then(devTree => devTree ? PostDto.toDto(devTree) : null);
            });
    }

    async update(id: string, entity: Partial<PostDto>): Promise<PostDto | null> {
        return this.postRepository.update(id, entity)
            .then(post => post ? PostDto.toDto(post) : null);
    }

    async delete(id: string): Promise<void> {
        return this.postRepository.delete(id);
    }
}
export class PostDto {
    id?: string;
    title: string;
    content: string;
    slug: string;
    available: boolean;

    createdAt?: Date;
    updatedAt?: Date;

    views?: number;
    likes?: number;

    constructor(
        title: string,
        content: string,
        slug: string,
        available: boolean
    ) {
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.available = available;
    }

    static toDto(post: any): PostDto {
        const newPostDto = new PostDto(
            post.title,
            post.content,
            post.slug,
            post.available
        );
        newPostDto.id = post._id;
        newPostDto.createdAt = post.createdAt;
        newPostDto.updatedAt = post.updatedAt;
        newPostDto.views = post.views;
        newPostDto.likes = post.likes;
        return newPostDto;
    }
}
import { SocialMediaDto } from "./SocialMediaDto";

export class DevTreeDto {
    id?: string;
    title: string;
    description: string;
    urlImage?: string;
    socialMedia: SocialMediaDto[];
    slug: string;
    available: boolean;

    createdAt?: Date;
    updatedAt?: Date;

    views?: number;
    likes?: number;

    constructor(
        title: string,
        description: string,
        socialMedia: SocialMediaDto[],
        slug: string,
        available: boolean,
        urlImage?: string
    ) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
        this.socialMedia = socialMedia;
        this.slug = slug;
        this.available = available;
    }

    static toDto(devTree: any) {
        const socialMediaDtos = devTree.socialMedia.map((sm: any) => SocialMediaDto.toDto(sm));
        const newDevTreeDto = new DevTreeDto(
            devTree.title,
            devTree.description,
            socialMediaDtos,
            devTree.slug,
            devTree.available,
            devTree.urlImage
        );
        newDevTreeDto.id = devTree.id;
        newDevTreeDto.createdAt = devTree.createdAt;
        newDevTreeDto.updatedAt = devTree.updatedAt;
        newDevTreeDto.views = devTree.views;
        newDevTreeDto.likes = devTree.likes;
        return newDevTreeDto;
    }

}
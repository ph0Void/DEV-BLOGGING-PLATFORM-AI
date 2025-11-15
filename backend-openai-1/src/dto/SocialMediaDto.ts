export class SocialMediaDto {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }

    static toDto(socialMedia: any): SocialMediaDto {
        return new SocialMediaDto(socialMedia.name, socialMedia.url);
    }
}
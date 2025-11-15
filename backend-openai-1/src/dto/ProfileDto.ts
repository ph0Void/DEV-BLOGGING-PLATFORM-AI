export class ProfileDto {

    nickname: string;
    avatarUrl?: string;

    constructor(nickname: string, avatarUrl?: string) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
    }

    public static toDto(profile: any): ProfileDto {
        return new ProfileDto(profile.nickname, profile.avatarUrl);
    }
}
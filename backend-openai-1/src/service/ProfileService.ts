import { ProfileDto } from "../dto/ProfileDto";
import { ProfileRepository } from "../repository/ProfileRepository";
import { ICrudService } from "./common/CrudService";

interface IProfileService extends ICrudService<ProfileDto, string> {
    findByUserId(userId: string): Promise<ProfileDto | null>;
    // createByUserId(userId: string, entity: ProfileDto): Promise<ProfileDto>;
}

export class ProfileService implements IProfileService {

    constructor(private readonly profileRepository: ProfileRepository) {

    }

    async findByUserId(userId: string): Promise<ProfileDto | null> {
        const profile = await this.profileRepository.findByUserId(userId);
        return profile ? new ProfileDto(profile.nickname) : null;
    }

    async create(entity: Partial<ProfileDto>): Promise<ProfileDto> {
        return this.profileRepository
            .create(entity)
            .then(profile => ProfileDto.toDto(profile));
    }

    async findById(id: string): Promise<ProfileDto | null> {
        return this.profileRepository.findById(id)
            .then(profile => profile ? ProfileDto.toDto(profile) : null);
    }

    async update(id: string, entity: ProfileDto): Promise<ProfileDto | null> {
        const updatedProfile = await this.profileRepository.update(id, {
            nickname: entity.nickname,
            avatarUrl: entity.avatarUrl
        });
        return updatedProfile ? new ProfileDto(updatedProfile.nickname) : null;
    }

    async updateByUserId(userId: string, entity: Partial<ProfileDto>): Promise<ProfileDto | null> {
        const profileExist = await this.profileRepository
            .findByUserId(userId)
            .catch(() => null);

        return this.update(profileExist?.id, { ...entity } as ProfileDto);
    }

    async delete(id: string): Promise<void> {
        await this.profileRepository.delete(id);
    }
}
export class UserDto {
    username: string;
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    static toDto(user: any): UserDto {
        return new UserDto(user.username, user.email);
    }


}
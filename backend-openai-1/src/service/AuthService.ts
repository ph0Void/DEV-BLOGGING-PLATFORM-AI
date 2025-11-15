import { LoginDto } from "../dto/auth/LoginDto";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto";
import { UserDto } from "../dto/UserDto";
import { UserRepository } from "../repository/UserRepository";
import { ComparePassword, HashPassword } from "../utils/BcryptAdapter";


interface IAuthService {
    loginAccount(user: LoginDto): Promise<UserDto>;
    registerAccount(user: RegisterUserDto): Promise<UserDto>;
}

export class AuthService implements IAuthService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async loginAccount(user: LoginDto): Promise<UserDto> {
        try {
            const existingUser = await this.userRepository
                .findByName(user.username);

            if (!existingUser) {
                throw new Error("El usuario no existe");
            }

            const isPasswordCorrect = ComparePassword(user.password, existingUser.password!);
            if (!isPasswordCorrect) {
                throw new Error("Credenciales no válidas");
            }

            const { password, ...userWithoutPassword } = existingUser;

            const userDto = UserDto.toDto(userWithoutPassword);

            return userDto;

        } catch (error) {
            console.log(`Error en [AuthService:loginAccount] ${error}`);
            throw error;
        }
    }

    async registerAccount(user: RegisterUserDto): Promise<UserDto> {
        try {
            const existingUserByUsername = await this.userRepository.findByName(user.username);
            if (existingUserByUsername) {
                throw new Error("El nombre de usuario ya está en uso");
            }

            const newUser = await this.userRepository.create({
                username: user.username,
                email: user.email,
                password: HashPassword(user.password),
                role: "USER"
            });

            const { password, ...userWithoutPassword } = newUser;
            const userDto = UserDto.toDto(userWithoutPassword);
            return userDto;

        } catch (error) {
            console.log(`Error en [AuthService:registerAccount] ${error}`);
            throw error;
        }
    }
}
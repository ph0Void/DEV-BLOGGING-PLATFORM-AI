import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export function HashPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

export function ComparePassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
}
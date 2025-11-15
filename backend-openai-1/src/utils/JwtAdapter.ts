import jwt, { VerifyErrors } from 'jsonwebtoken';
import { EnvConfig } from '../config/EnvCondig';

export class JwtAdapter {
    private static readonly JWT_SECRET = EnvConfig.JWT_SECRET;

    static generateToken(payload: any) {
        return new Promise((resolve) => {
            jwt.sign(
                payload,
                this.JWT_SECRET,
                { expiresIn: '1d' },
                (err: Error | null, token?: string) => {
                    if (err || !token) return resolve(null);
                    resolve(token);
                },
            )
        })
    }

    static validateToken<T = any>(token: string) {
        return new Promise((resolve) => {
            jwt.verify(
                token,
                this.JWT_SECRET,
                (err: VerifyErrors | null, decoded?: object | string) => {
                    if (err || !decoded) return resolve(null);
                    resolve(decoded as T);
                },
            );
        });
    }

}
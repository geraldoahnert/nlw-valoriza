import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRespositories = getCustomRepository(UsersRepositories);

        // -> Verify if email exists.
        const user = await usersRespositories.findOne({
            email,
        });

        if (!user) {
            throw new Error('Email/Password incorrect.');
        }

        // -> Verify if password is correct.
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect.');
        }

        // -> Generate token.

        const token = sign(
            {
                email: user.email,
            },
            '9e789ed2961818bfe640d1cc6b5fee84',
            {
                subject: user.id,
                expiresIn: '1d',
            }
        );

        return token;
    }
}

export { AuthenticateUserService };

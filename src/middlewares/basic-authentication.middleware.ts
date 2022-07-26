import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export default async function basicAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido!')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbiddenError('Usuario e/ou senha não informados!')
        }

        const user = await userRepository.findByUser(username, password);

        if (!user) {
            throw new ForbiddenError('Usuario e/ou senha inválidos!')
        }

        request.user = user;
        next();

    } catch (error) {

    }
}
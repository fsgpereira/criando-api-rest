
import { Request, Response, NextFunction, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT, { SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const user = request.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado!');
        }

        const jwtPayload = { userName: user.username };
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: 10000 }
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        response.status(StatusCodes.OK).json({ token: jwt });


    } catch (error) {
        next(error);
    }

});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(StatusCodes.OK);
});

authorizationRoute.post('/token/refresh', jwtAuthenticationMiddleware, (request: Request, response: Response, next: NextFunction) => {


    response.sendStatus(StatusCodes.OK);
});

export default authorizationRoute;
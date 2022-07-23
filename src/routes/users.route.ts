import { Router, Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";


const usersRoute = Router();

//get apenas consulta
usersRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    /**verificar se tem o status code na doc do npm */
    response.status(StatusCodes.OK).json({ users });
});

//get passando um parametro
usersRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    //quando vem uma querystring na url
    //request.query

    //quando vem um parametro na url
    //request.params

    //nós estamos passando um parametro e devolvendo ele mesmo
    try {
        const uuid = request.params.uuid;
        const user = await userRepository.findById(uuid);
        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);
    }

});

//post
usersRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;

    const uuid = await userRepository.create(newUser);

    response.status(StatusCodes.CREATED).send(uuid)
});

//update
usersRoute.put('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const modifiedUser = request.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser)
    response.status(StatusCodes.OK).send(modifiedUser);
});

//delete
usersRoute.delete('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    await userRepository.remove(uuid);
    response.sendStatus(StatusCodes.OK);
});


export default usersRoute;
import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute = Router();

statusRoute.get('/Status', (request: Request, response: Response, next: NextFunction) => {
    response.send(StatusCodes.OK);
});

export default statusRoute;
import { User } from "../models/user.model";

//essa classe extende o modulo express, para colocar um atributo customizado (user) na interface de Request
declare module 'express-serve-static-core' {
    interface Request {
        user?: User | null
    }
}
import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

//alt + Shift + O -> organiza os imports
const app = express();

//configurações basicas da aplicação 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//configurações de rotas
app.use(statusRoute);
app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//configuração dos handlers de error
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000!!!');
})
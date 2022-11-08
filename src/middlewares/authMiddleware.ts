import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../helpers/api-errors";
import jwt from 'jsonwebtoken';
import { pessoaRepository } from "../repositories/pessoaRepository";

type JWTPayload = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        throw new UnauthorizedError("Necessário token para autenticação!");
    } else {
        const token = authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_PASS ?? '') as JWTPayload;
        console.log(user);
        if (!user) {
            throw new UnauthorizedError("O token é inválido!");
        } else {
            const userVerify = await pessoaRepository.findOneBy({ id: user.id });
            console.log(userVerify)
            if (!userVerify) {
                throw new NotFoundError('Usuario não autorizado!');
            } else {
                req.user = user;
                next();
            }
        }

       
    }
}
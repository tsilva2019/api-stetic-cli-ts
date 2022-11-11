import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../helpers/api-errors";
import jwt from "jsonwebtoken";
import { pessoaRepository } from "../repositories/pessoaRepository";

type JWTPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Necessário token para autenticação!");
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_PASS ?? "", function (err, decoded) {
    if (err) {
      throw new UnauthorizedError(err.message);
    }
    const user = decoded as JWTPayload;
    if (!user) {
      throw new UnauthorizedError("Usuário não autorizado!");
    }
    // const userVerify = pessoaRepository.findOneBy({
    //   id: user.id,
    // });
    // if (!userVerify) {
    //   throw new UnauthorizedError("Usuário não autorizado!");
    // }
    req.user = user;
    next();
  });
};

import { Request, Response } from "express";
import { LockNotSupportedOnGivenDriverError } from "typeorm";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { pessoaRepository } from "../repositories/pessoaRepository";


export class LoginController {
    
    async create(req: Request, res: Response) {
        const { email, senha } = req.body;

        
    }

}
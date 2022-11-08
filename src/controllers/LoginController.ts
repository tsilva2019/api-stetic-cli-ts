import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { pessoaRepository } from "../repositories/pessoaRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export class LoginController {
    
    async login(req: Request, res: Response) {
        const { login, senha } = req.body;
        const user = await pessoaRepository.findOneBy([{ email: login}, { cpf: login }]);
        if (!user) {
            throw new NotFoundError('O login ou senha informado é inválido!');
        } else {
            const verifyPass = await bcrypt.compare(senha, user.senha);
            if(!verifyPass){
                throw new NotFoundError('O login ou senha informado é inválido!');
            }else{
                const token = jwt.sign({ 
                                        id: user.id, nome: user.nome, email: user.email
                                        }, process.env.JWT_PASS ?? '', { expiresIn: '1d' });
                
                const {
                    senha, 
                    cpf,
                    ativo,
                    termo,
                    anamnese,
                    createdDate,
                    updatedDate,
                    deletedDate, 
                    ...userLogin
                } = user;   
                
                return res.json({
                    user: userLogin,
                    token: token
                })   
            }
        }
        
    }

}
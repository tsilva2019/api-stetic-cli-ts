import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/api-errors";
import { pessoaRepository } from "../repositories/pessoaRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type JWTPayload = {
  id: string;
};
export class LoginController {
  //Executa o login e retorna o token
  async login(req: Request, res: Response) {
    const { login, senha } = req.body;
    //Verifica se o usuario existe no banco de dados
    const user = await pessoaRepository.findOneBy([
      { email: login },
      { cpf: login },
    ]);
    if (!user) {
      throw new NotFoundError("O login ou senha informado é inválido!");
    } else {
      //Se existir compara transforma a senha informada em hash e compara com a do banco dedados
      const verifyPass = await bcrypt.compare(senha, user.senha);
      if (!verifyPass) {
        throw new NotFoundError("O login ou senha informado é inválido!");
      } else {
        //Se o hash da senha for igual a do banco, então gera o token
        const token = jwt.sign(
          {
            id: user.id,
            nome: user.nome,
            email: user.email,
          },
          process.env.JWT_PASS ?? "",
          { expiresIn: "1d" }
        );
        //Retira informação desnecessária do usuario e retorna token,id,nome e e-mail
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
          token: token,
        });
      }
    }
  }

  async validaToken(req: Request, res:Response) {
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
    return res.status(200).json(req.user);
  });

  }

  async getProfile(req: Request, res: Response) {
    const id = req.user.id;
    const userVerify = await pessoaRepository.findOneBy({ id });
    //console.log(usVerify?.senha)
    if(!userVerify) {
      throw new NotFoundError('Profile não encontrado!');
    }

    return res.status(200).json(userVerify.getPessoaSegura());
  }

}

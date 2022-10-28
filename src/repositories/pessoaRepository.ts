import { AppDataSource } from "../data-source";
import { Pessoa } from "../entities/Pessoa";

export const pessoaRepository = AppDataSource.getRepository(Pessoa);
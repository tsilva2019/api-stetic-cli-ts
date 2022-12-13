import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { agendamentoRepository } from "../repositories/agendamentoRepository";
import { pessoaRepository } from "../repositories/pessoaRepository";
import bcrypt from 'bcrypt';
import { Pessoa } from "../entities/Pessoa";

export class PessoaController {

    async listAll(req: Request, res: Response): Promise<Response> {

        const pessoas = await pessoaRepository.findAndCount(
        )
        return res.status(200).json(pessoas);
    }

    async listAllAgendamentosCliente(req: Request, res: Response): Promise<Response> {
        const { idCliente } = req.params
        const agendamentos = await agendamentoRepository.findAndCount({
            relations: {
                cliente: true
            },
            where: {
                cliente: {
                    id: idCliente
                }
            },
        });
        if (agendamentos[1] === 0) {
            throw new NotFoundError('Agendamentos não encontrado para o cliente informado!');
        }
        return res.status(200).json(agendamentos);
    }

    async buscaByID(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const pessoa = await pessoaRepository.findOneBy({ id: id }

        )
        return res.status(200).json(pessoa);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const pessoa = req.body;
        if (!pessoa) {
            throw new BadRequestError('Dados obrigatorios não informado!');
        } else {
            const cadastroExistente = await pessoaRepository.findOneBy([{ email: pessoa.email }, { cpf: pessoa.cpf }])
            if (cadastroExistente) {
                throw new BadRequestError("Usuario já está cadastrado!");
            } else {
                pessoa.senha = await bcrypt.hash(pessoa.senha,10)
                const novaPessoa = pessoaRepository.create(pessoa);
                const result = await pessoaRepository.save(novaPessoa);

                return res.status(201).json(novaPessoa);
            }
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const dadosAtualizados = req.body;
        if(dadosAtualizados.senha) {
            dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha,10)
        }
        
        await pessoaRepository.update(id, dadosAtualizados);
        const pessoaAtualizada = await pessoaRepository.findOneBy({id});
        //const { senha, ...userProfile } = pessoaAtualizada[0];
        return res.status(201).json(pessoaAtualizada?.getPessoaSegura());
    }

    async remove(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        await pessoaRepository.softDelete(id);
        return res.status(201).json({ mensagem: 'Registro removido com sucesso!' });
    }

    async restore(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        await pessoaRepository.restore(id);
        return res.status(201).json({ mensagem: 'Registro restaurado com sucesso!' });
    }

    async createAgendamento(req: Request, res: Response): Promise<Response> {
        const { idCliente } = req.params
        const dadosAgendamento = req.body;
        if (!dadosAgendamento) {
            throw new BadRequestError('Dados do agendamento não informado!');
        } else {
            const cliente = await pessoaRepository.findOneBy({ id: idCliente });
            if (!cliente) {
                throw new NotFoundError('O cliente informado não foi encontrado!');
            } else {
                dadosAgendamento.cliente = cliente;
                const novoAgendamento = await agendamentoRepository.create(dadosAgendamento);
                await agendamentoRepository.save(novoAgendamento);
                return res.status(201).json(novoAgendamento);
            }
        }
    }
}
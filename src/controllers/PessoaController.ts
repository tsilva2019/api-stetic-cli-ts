import { Request, Response } from "express";
import { agendamentoRepository } from "../repositories/agendamentoRepository";
import { pessoaRepository } from "../repositories/pessoaRepository";

export class PessoaController {

    async listAll(req: Request, res: Response) {
        try {
            const pessoas = await pessoaRepository.findAndCount(
            //   {
            //     relations: {
            //         agendamentos: true
            //     }
            // }
            )
            return res.status(200).json(pessoas);
        } catch (error) {
            
        }
    }

    async create(req: Request, res: Response) {
        const pessoa = req.body;
        if(!pessoa) {
            return res.status(400).json({ mensagem: 'Dados obrigatorios não informado!' })
        }

        try {
            const novaPessoa = pessoaRepository.create(pessoa);
            console.log(novaPessoa);
            await pessoaRepository.save(novaPessoa);
            return res.status(201).json(novaPessoa);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const dadosAtualizados = req.body;

        try {
            const pessoaAtualizada = await pessoaRepository.update(id,dadosAtualizados);
            console.log(pessoaAtualizada);
            return res.status(201).json(pessoaAtualizada);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        try {
            await pessoaRepository.softDelete(id);
            return res.status(201).json({ mensagem: 'Registro removido com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async restore(req: Request, res: Response) {
        const { id } = req.params
        try {
            await pessoaRepository.restore(id);
            return res.status(201).json({ mensagem: 'Registro restaurado com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }



    async createAgendamento(req: Request, res: Response) {
        const { idCliente } = req.params
        const agendamento = req.body;
        if(!agendamento) {
            return res.status(400).json({ mensagem: 'Dados obrigatorios não informado!' })
        }

        try {
            const cliente = await pessoaRepository.findOneBy({ id: idCliente });
            if(!cliente) {
                return res.status(404).json({ mensagem: 'Cliente não foi encontrado!' })
            }
            agendamento.cliente = cliente;
            const novoAgendamento = agendamentoRepository.create(agendamento);
            console.log(novoAgendamento);
           await agendamentoRepository.save(novoAgendamento);
            return res.status(201).json(novoAgendamento);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }
}
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { agendamentoRepository } from "../repositories/agendamentoRepository";
import { pessoaRepository } from "../repositories/pessoaRepository";

export class AgendamentoController {

    async listAll(req: Request, res: Response) {

            const agendamentos = await agendamentoRepository.findAndCount(
              {
                relations: { cliente: true }
            })
            if(agendamentos[1] === 0) {
                throw new NotFoundError('Nenhum agendamento encontrado!')
            }
            if(!agendamentos) {
                throw new BadRequestError('Erro na busca!')
            }
            return res.status(200).json(agendamentos);
    }

    async buscaByID(req: Request, res: Response) {
        const { id } = req.params
        try {
            const agendamento = await agendamentoRepository.find({
                relations: {
                    cliente: true
                },
                where: {
                    id: id
                }
        })
            return res.status(200).json(agendamento);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async create(req: Request, res: Response) {
        const agendamento = req.body;
        console.log(agendamento);
        if(!agendamento) {
            return res.status(400).json({ mensagem: 'Dados obrigatorios não informado!' })
        }

        try {
            const cliente = await pessoaRepository.findOneBy({ id: agendamento.cliente_id});
            agendamento.cliente = cliente;
            let novoAgendamento = agendamentoRepository.create(agendamento);
            console.log(novoAgendamento);
            const agendamentoCriado = await agendamentoRepository.save(novoAgendamento);
            return res.status(201).json(agendamentoCriado);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const dadosAtualizados = req.body;

        try {
            const agendamentoAtualizado = await agendamentoRepository.update(id,dadosAtualizados);
            console.log(agendamentoAtualizado);
            return res.status(201).json(agendamentoAtualizado);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        try {
            await agendamentoRepository.softDelete(id);
            return res.status(201).json({ mensagem: 'Registro removido com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async restore(req: Request, res: Response) {
        const { id } = req.params
        try {
            await agendamentoRepository.restore(id);
            return res.status(201).json({ mensagem: 'Registro restaurado com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

}
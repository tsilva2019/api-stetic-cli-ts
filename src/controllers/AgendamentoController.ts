import { Request, Response } from "express";
import { agendamentoRepository } from "../repositories/agendamentoRepository";

export class AgendamentoController {

    async listAll(req: Request, res: Response) {
        try {
            const agendamentos = await agendamentoRepository.findAndCount(
            //   {
            //     relations: {
            //         agendamentos: true
            //     }
            // }
            )
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async create(req: Request, res: Response) {
        const agendamento = req.body;
        if(!agendamento) {
            return res.status(400).json({ mensagem: 'Dados obrigatorios não informado!' })
        }

        try {
            const novaagendamento = agendamentoRepository.create(agendamento);
            console.log(novaagendamento);
            await agendamentoRepository.save(novaagendamento);
            return res.status(201).json(novaagendamento);

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
}
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { habitosDiariosRepository } from "../repositories/habitosDiariosRepository";
import { pessoaRepository } from "../repositories/pessoaRepository";

export class HabitosDiariosController {

    async listAll(req: Request, res: Response) {
            const habitosDiarios = await habitosDiariosRepository.findAndCount(
              {
                relations: { cliente: true }
            });

            if(habitosDiarios[1] === 0) {
                throw new NotFoundError("Cadastro dos habitos ainda não foi realizado!");
            }
            if(!habitosDiarios) {
                throw new BadRequestError('Erro na busca!');
            }
            return res.status(200).json(habitosDiarios);
    }

    async buscaByID(req: Request, res: Response) {
        const { id } = req.params

            const habitosDiarios = await habitosDiariosRepository.find({
                relations: { cliente: true },
                where: { id: id }
        });
        if(habitosDiarios === null) {
            throw new NotFoundError("Cadastro dos habitos ainda não foi realizado!");
        }
        if(!habitosDiarios) {
            throw new BadRequestError('Erro na busca!');
        }
            return res.status(200).json(habitosDiarios);
    }

    async create(req: Request, res: Response) {
        const { idCliente } = req.params;
        const habitosDiarios = req.body;
        if(!habitosDiarios) {
           throw new BadRequestError('Dados não informado!');
        }
            const cliente = await pessoaRepository.findOneBy({ id: idCliente });
            console.log(cliente)
        if(!cliente) {
            throw new BadRequestError('Erro ao tentar encontrar o cliente!');
        }
        if(cliente === null) {
            throw new NotFoundError('Cliente não encontrado!');
        }

            habitosDiarios.cliente = cliente;
            let novohabitosDiarios = habitosDiariosRepository.create(habitosDiarios);
            console.log(novohabitosDiarios);
            const habitosDiariosCriado = await habitosDiariosRepository.save(novohabitosDiarios);
            return res.status(201).json(habitosDiariosCriado);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const dadosAtualizados = req.body;

        try {
            const habitosDiariosAtualizado = await habitosDiariosRepository.update(id,dadosAtualizados);
            console.log(habitosDiariosAtualizado);
            return res.status(201).json(habitosDiariosAtualizado);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        try {
            await habitosDiariosRepository.softDelete(id);
            return res.status(201).json({ mensagem: 'Registro removido com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

    async restore(req: Request, res: Response) {
        const { id } = req.params
        try {
            await habitosDiariosRepository.restore(id);
            return res.status(201).json({ mensagem: 'Registro restaurado com sucesso!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Server internal error!' })
        }
    }

}
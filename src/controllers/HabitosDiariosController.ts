import { Request, Response } from "express";
import { HabitosDiarios } from "../entities/HabitosDiarios";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { habitosDiariosRepository } from "../repositories/habitosDiariosRepository";
import { pessoaRepository } from "../repositories/pessoaRepository";

export class HabitosDiariosController {
  async listAll(req: Request, res: Response) {
    const habitosDiarios = await habitosDiariosRepository.findAndCount({
      relations: { cliente: true },
    });

    if (habitosDiarios[1] === 0) {
      throw new NotFoundError("Cadastro dos habitos ainda não foi realizado!");
    }
    if (!habitosDiarios) {
      throw new BadRequestError("Erro na busca!");
    }
    return res.status(200).json(habitosDiarios);
  }

  async buscaByID(req: Request, res: Response) {
    const { id } = req.params;

    const habitosDiarios = await habitosDiariosRepository.find({
      relations: { cliente: true },
      where: { id: id },
    });
    if (habitosDiarios === null) {
      throw new NotFoundError("Cadastro dos habitos ainda não foi realizado!");
    }
    if (!habitosDiarios) {
      throw new BadRequestError("Erro na busca!");
    }
    return res.status(200).json(habitosDiarios);
  }

  async create(req: Request, res: Response) {
    const { idCliente } = req.params;
    const habitosDiarios = req.body;

    const cliente = await pessoaRepository.findOneBy({ id: idCliente });

    console.log(cliente);
    if (!cliente) {
      throw new BadRequestError("Erro ao tentar encontrar o cliente!");
    }
    if (cliente === null) {
      throw new NotFoundError("Cliente não encontrado!");
    }

    const verifyHabitos = await habitosDiariosRepository.findOneBy({
      cliente: {
        id: cliente.id,
      },
    });

    if (verifyHabitos) {
      throw new BadRequestError(
        "Cliente ja possui ficha cadastrada, escolha a opção Atualizar ficha!"
      );
    }
    //Atualizar coluna de fichaAnamnese no cadastro da pessoa
    cliente.anamnese = true;
    pessoaRepository.update(cliente.id, cliente);
    habitosDiarios.cliente = cliente.getPessoaSegura();
    let novoHabitosDiarios = habitosDiariosRepository.create(habitosDiarios);

    const habitosDiariosCriado = await habitosDiariosRepository.save(
      novoHabitosDiarios
    ).catch( err => { throw new BadRequestError(err) });;

    return res.status(201).json(habitosDiariosCriado);
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const dadosAtualizados = req.body;

   await habitosDiariosRepository.update(
        id,
        dadosAtualizados
      ).catch( err => { throw new BadRequestError(err) });
      const habitosDiariosAtualizado = await habitosDiariosRepository.findOneBy({ id: id })
      return res.status(201).json(habitosDiariosAtualizado);
    
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await habitosDiariosRepository.softDelete(id);
      return res
        .status(201)
        .json({ mensagem: "Registro removido com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Server internal error!" });
    }
  }

  async restore(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await habitosDiariosRepository.restore(id);
      return res
        .status(201)
        .json({ mensagem: "Registro restaurado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Server internal error!" });
    }
  }
}

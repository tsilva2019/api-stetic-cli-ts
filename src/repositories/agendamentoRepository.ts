import { AppDataSource } from "../data-source";
import { Agendamento } from "../entities/Agendamento";

export const agendamentoRepository = AppDataSource.getRepository(Agendamento);
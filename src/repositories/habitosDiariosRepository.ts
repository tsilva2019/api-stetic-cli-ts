import { AppDataSource } from "../data-source";
import { HabitosDiarios } from "../entities/HabitosDiarios";

export const habitosDiariosRepository = AppDataSource.getRepository(HabitosDiarios);
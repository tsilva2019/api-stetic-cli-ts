import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Agendamento } from './Agendamento';

@Entity('pessoas')
export class Pessoa {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'text' })
    nome: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    cpf: string

    @Column({ type: 'text' })
    login: string

    @Column({ type: 'text' })
    senha: string
    
    @OneToMany(() => Agendamento, agendamento => agendamento.cliente)
    agendamentos: Agendamento[]
}
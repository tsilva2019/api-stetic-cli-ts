import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Agendamento } from './Agendamento';

@Entity('pessoas')
export class Pessoa {

    @PrimaryGeneratedColumn('uuid')
    id: string

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

    @Column({type: 'boolean'})
    ativo: boolean
    
    @OneToMany(() => Agendamento, agendamento => agendamento.cliente)
    agendamentos: Agendamento[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
}
import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Agendamento } from './Agendamento';

@Entity('pessoas')
export class Pessoa {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text' })
    nome: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text', unique: true })
    cpf: string

    @Column({ type: 'text' })
    senha: string

    @Column({type: 'boolean'})
    ativo: boolean

    @Column({type: 'boolean', nullable: true})
    termo: boolean

    @Column({type: 'boolean', nullable: true})
    anamnese: boolean
    
    @OneToMany(() => Agendamento, agendamento => agendamento.cliente)
    agendamentos: Agendamento[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date

    getPessoaSegura(): Readonly<Object> {
        const { senha, ...pessoaSegura } = this;
        return pessoaSegura;
    }
}
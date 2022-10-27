import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from './Pessoa';

@Entity('agendamentos')
export class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'date' })
    dataAgendamento: Date

    @Column({ type: 'time' })
    horaAgendamento: Date

    @Column({ type: 'text' })
    status: string
    
    @ManyToOne(() => Pessoa, pessoa => pessoa.agendamentos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Pessoa
}
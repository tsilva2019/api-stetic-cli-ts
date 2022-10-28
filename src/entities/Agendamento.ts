import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Pessoa } from './Pessoa';

@Entity('agendamentos')
export class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'date' })
    dataAgendamento: Date

    @Column({ type: 'time' })
    horaAgendamento: Date

    @Column({ type: 'text' })
    status: string
    
    @ManyToOne(() => Pessoa, pessoa => pessoa.agendamentos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Pessoa

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
}
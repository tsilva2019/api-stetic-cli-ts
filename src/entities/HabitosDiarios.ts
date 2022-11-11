import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pessoa } from "./Pessoa"

@Entity('habitosDiarios')
export class HabitosDiarios {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Pessoa)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Pessoa

    @Column({type: 'boolean', nullable: true})
    tratamentoAnterior: boolean
    @Column({type: 'text', nullable: true})
    qualTratamentoAnterior: string

    @Column({type: 'boolean', nullable: true})
    lentesContato: boolean

    @Column({type: 'boolean', nullable: true})
    usoCosmeticos: boolean
    @Column({type: 'text', nullable: true})
    qualCosmetico: string

    @Column({type: 'boolean', nullable: true})
    usoFiltroSolar: boolean
    @Column({type: 'int', nullable: true})
    frequenciaFiltroSolar: number

    @Column({type: 'boolean', nullable: true})
    tabagismo: boolean
    @Column({type: 'int', nullable: true})
    qtdeCigarros: number

    @Column({type: 'boolean', nullable: true})
    bebidaAlcoolica: boolean
    @Column({type: 'int', nullable: true})
    frequenciaBebidaAlcoolica: number

    @Column({type: 'text', nullable: true})
    funcaoIntestinal: string

    @Column({type: 'text', nullable: true})
    qualidadeSono: string

    @Column({type: 'text', nullable: true})
    ingestaoAgua: string

    @Column({type: 'text', nullable: true})
    tipoAlimentacao: string

    @Column({type: 'boolean', nullable: true})
    atividadeFisica: boolean
    @Column({type: 'text', nullable: true})
    tipoAtividadeFisica: string
    @Column({type: 'int', nullable: true})
    frequenciaAtividadeFisica: number

    @Column({type: 'boolean', nullable: true})
    usoAnticoncepcional: boolean
    @Column({type: 'text', nullable: true})
    qualAnticoncepcional: string

    @Column({type: 'boolean', nullable: true})
    gestante: boolean
    @Column({type: 'boolean', nullable: true})
    lactante: boolean
    @Column({type: 'int', nullable: true})
    numeroGestacoes: number
    @Column({type: 'int', nullable: true})
    tempoGestacoesAnteriores: number

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
}
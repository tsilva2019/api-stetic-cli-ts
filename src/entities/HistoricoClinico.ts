import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pessoa } from "./Pessoa"

@Entity('historicoClinico')
export class HistoricoClinico {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Pessoa)
    @JoinColumn({ name: 'cliente_id'})
    cliente: Pessoa

    @Column({type: 'boolean', nullable: true})
    emTratamentoMedico: boolean
    @Column({type: 'text', nullable: true})
    usoMedicamento: string

    @Column({type: 'boolean', nullable: true})
    usoAnticoagulante: boolean
    @Column({type: 'text', nullable: true})
    qualAnticoagulante: string

    @Column({type: 'boolean', nullable: true})
    antecedentesAlergicos: boolean
    @Column({type: 'text', nullable: true})
    qualAntecendenteAlergico: string
    @Column({type: 'boolean', nullable: true})
    alergiaAnestesico: boolean
    @Column({type: 'text', nullable: true})
    qualAnestesico: string

    @Column({type: 'boolean', nullable: true})
    portadorMarcapasso: boolean

    @Column({type: 'boolean', nullable: true})
    alteracoesCardiacas: boolean
    @Column({type: 'text', nullable: true})
    qualAlteracaoCardiaca: string

    @Column({type: 'boolean', nullable: true})
    alteracoesLipidicas: boolean
    @Column({type: 'text', nullable: true})
    qualAlteracaoLipidica: string

    @Column({type: 'boolean', nullable: true})
    hipoHipertensaoArterial: boolean
    
    @Column({type: 'boolean', nullable: true})
    disturbioCirculatorio: boolean
    @Column({type: 'text', nullable: true})
    qualDisturbioCirculatorio: string

    @Column({type: 'boolean', nullable: true})
    disturbioRenal: boolean
    @Column({type: 'text', nullable: true})
    qualDisturbioRenal: string

    @Column({type: 'boolean', nullable: true})
    disturbioHormonal: boolean
    @Column({type: 'text', nullable: true})
    qualDisturbioHormonal: string

    @Column({type: 'boolean', nullable: true})
    disturbioGastroIntestinal: boolean
    @Column({type: 'text', nullable: true})
    qualDisturbioGastroIntestinal: string

    @Column({type: 'boolean', nullable: true})
    altPsicologicasPsiquiatricas: boolean
    @Column({type: 'text', nullable: true})
    qualAltPsicologicasPsiquiatricas: string

    @Column({type: 'boolean', nullable: true})
    antecedentesOncologicos: boolean
    @Column({type: 'text', nullable: true})
    qualAntecedentesOncologicos: string

    @Column({type: 'boolean', nullable: true})
    diabetes: boolean
    @Column({type: 'text', nullable: true})
    qualTipoDiabetes: string

    @Column({type: 'boolean', nullable: true})
    doencaAutoimune: boolean
    @Column({type: 'text', nullable: true})
    qualDoencaAutoimune: string

    @Column({type: 'boolean', nullable: true})
    soropositivo: boolean

    @Column({type: 'boolean', nullable: true})
    queloide: boolean

    @Column({type: 'boolean', nullable: true})
    protesesMetalicas: boolean
    @Column({type: 'text', nullable: true})
    qualProtese: string

    @Column({type: 'boolean', nullable: true})
    tratamentoDermatologico: boolean
    @Column({type: 'text', nullable: true})
    qualTratamentoDerm: string

    @Column({type: 'boolean', nullable: true})
    cirurgiaPlastica: boolean
    @Column({type: 'text', nullable: true})
    qualCirurgiaPlastica: string

    @Column({type: 'boolean', nullable: true})
    cirurgiaReparadora: boolean
    @Column({type: 'text', nullable: true})
    qualCirurgiaReparadora: string

    @Column({type: 'text', nullable: true})
    outrasCondicoesDoenca: string

    @Column({ type: 'date', nullable: true})
    dataUltimoCheckUP: Date

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
}

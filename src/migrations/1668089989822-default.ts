import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668089989822 implements MigrationInterface {
    name = 'default1668089989822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "historicoClinico" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "emTratamentoMedico" boolean, "usoMedicamento" text, "usoAnticoagulante" boolean, "qualAnticoagulante" text, "antecedentesAlergicos" boolean, "qualAntecendenteAlergico" text, "alergiaAnestesico" boolean, "qualAnestesico" text, "portadorMarcapasso" boolean, "alteracoesCardiacas" boolean, "qualAlteracaoCardiaca" text, "alteracoesLipidicas" boolean, "qualAlteracaoLipidica" text, "hipoHipertensaoArterial" boolean, "disturbioCirculatorio" boolean, "qualDisturbioCirculatorio" text, "disturbioRenal" boolean, "qualDisturbioRenal" text, "disturbioHormonal" boolean, "qualDisturbioHormonal" text, "disturbioGastroIntestinal" boolean, "qualDisturbioGastroIntestinal" text, "altPsicologicasPsiquiatricas" boolean, "qualAltPsicologicasPsiquiatricas" text, "antecedentesOncologicos" boolean, "qualAntecedentesOncologicos" text, "diabetes" boolean, "qualTipoDiabetes" text, "doencaAutoimune" boolean, "qualDoencaAutoimune" text, "soropositivo" boolean, "queloide" boolean, "outrasCondicoesDoenca" text, "dataUltimoCheckUP" date, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "cliente_id" uuid, CONSTRAINT "REL_a91904ad56486e5f89b1a6d1fc" UNIQUE ("cliente_id"), CONSTRAINT "PK_5a60b4f78c463ae1e05842be90a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD CONSTRAINT "FK_a91904ad56486e5f89b1a6d1fce" FOREIGN KEY ("cliente_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP CONSTRAINT "FK_a91904ad56486e5f89b1a6d1fce"`);
        await queryRunner.query(`DROP TABLE "historicoClinico"`);
    }

}

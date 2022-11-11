import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668088545388 implements MigrationInterface {
    name = 'default1668088545388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habitosDiarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tratamentoAnterior" boolean, "qualTratamentoAnterior" text, "lentesContato" boolean, "usoCosmeticos" boolean, "qualCosmetico" text, "usoFiltroSolar" boolean, "frequenciaFiltroSolar" integer, "tabagismo" boolean, "qtdeCigarros" integer, "bebidaAlcoolica" boolean, "frequenciaBebidaAlcoolica" integer, "funcaoIntestinal" text, "qualidadeSono" text, "ingestaoAgua" text, "tipoAlimentacao" text, "atividadeFisica" boolean, "tipoAtividadeFisica" text, "frequenciaAtividadeFisica" integer, "usoAnticoncepcional" boolean, "qualAnticoncepcional" text, "gestante" boolean, "lactante" boolean, "numeroGestacoes" integer, "tempoGestacoesAnteriores" integer, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "cliente_id" uuid, CONSTRAINT "REL_8c84f4a72281a383f0d27227e7" UNIQUE ("cliente_id"), CONSTRAINT "PK_c41f29ca0df7a707a940b4ee34f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "habitosDiarios" ADD CONSTRAINT "FK_8c84f4a72281a383f0d27227e71" FOREIGN KEY ("cliente_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "habitosDiarios" DROP CONSTRAINT "FK_8c84f4a72281a383f0d27227e71"`);
        await queryRunner.query(`DROP TABLE "habitosDiarios"`);
    }

}

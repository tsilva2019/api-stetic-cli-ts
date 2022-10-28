import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666959673288 implements MigrationInterface {
    name = 'default1666959673288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" text NOT NULL, "email" text NOT NULL, "cpf" text NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, "ativo" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dataAgendamento" date NOT NULL, "horaAgendamento" TIME NOT NULL, "status" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "cliente_id" uuid, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_85e795b2f97d2f012070453d5ec" FOREIGN KEY ("cliente_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_85e795b2f97d2f012070453d5ec"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "pessoas"`);
    }

}

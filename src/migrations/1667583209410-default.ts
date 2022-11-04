import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667583209410 implements MigrationInterface {
    name = 'default1667583209410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "termo" boolean`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "anamnese" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "anamnese"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "termo"`);
    }

}

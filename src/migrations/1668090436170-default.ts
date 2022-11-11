import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668090436170 implements MigrationInterface {
    name = 'default1668090436170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "protesesMetalicas" boolean`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "qualProtese" text`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "tratamentoDermatologico" boolean`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "qualTratamentoDerm" text`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "cirurgiaPlastica" boolean`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "qualCirurgiaPlastica" text`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "cirurgiaReparadora" boolean`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" ADD "qualCirurgiaReparadora" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "qualCirurgiaReparadora"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "cirurgiaReparadora"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "qualCirurgiaPlastica"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "cirurgiaPlastica"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "qualTratamentoDerm"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "tratamentoDermatologico"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "qualProtese"`);
        await queryRunner.query(`ALTER TABLE "historicoClinico" DROP COLUMN "protesesMetalicas"`);
    }

}

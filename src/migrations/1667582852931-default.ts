import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667582852931 implements MigrationInterface {
    name = 'default1667582852931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "UQ_3d143b18117467880d7194ef7b0"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "login"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "login" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "UQ_3d143b18117467880d7194ef7b0" UNIQUE ("login")`);
    }

}

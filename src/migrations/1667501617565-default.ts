import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667501617565 implements MigrationInterface {
    name = 'default1667501617565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "UQ_7ceb74dc9f2caea4eae596ab6aa" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "UQ_7661e2cfd87d77d744a92ce43d3" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "UQ_3d143b18117467880d7194ef7b0" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "UQ_3d143b18117467880d7194ef7b0"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "UQ_7661e2cfd87d77d744a92ce43d3"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "UQ_7ceb74dc9f2caea4eae596ab6aa"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class ExchangeRate1720258698809 implements MigrationInterface {
    name = 'ExchangeRate1720258698809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL, "fromCurrency" character varying NOT NULL, "toCurrency" character varying NOT NULL, "rate" numeric NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "UQ_92dbabec52a2b2708ce7b74ecd0" UNIQUE ("fromCurrency"), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}

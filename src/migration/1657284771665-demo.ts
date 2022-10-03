import {MigrationInterface, QueryRunner} from "typeorm";

export class demo1657284771665 implements MigrationInterface {
    name = 'demo1657284771665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50), "lastName" character varying(50), "email" character varying(256) NOT NULL, "mobileNo" bigint, "password" character varying NOT NULL, "createdBy" character varying(80), "updatedBy" character varying(80), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e5eb03052e49a88208b117be11" UNIQUE ("email"), CONSTRAINT "PK_2f5c3a233c33616f031206e11bd" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}

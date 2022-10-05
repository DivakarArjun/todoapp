import {MigrationInterface, QueryRunner} from "typeorm";

export class init1664806752302 implements MigrationInterface {
    name = 'init1664806752302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("adminId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50), "lastName" character varying(50), "email" character varying(256) NOT NULL, "mobileNo" bigint, "password" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "userType" character varying NOT NULL DEFAULT 'ADMIN', "profilePicture" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_abce4cc3fe598f242ab45e529b6" PRIMARY KEY ("adminId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50), "lastName" character varying(50), "email" character varying(256) NOT NULL, "status" integer NOT NULL DEFAULT '0', "mobileNo" bigint, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_1e4be10b13490bd87f4cc30c142" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "type" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_3399e2710196ea4bf734751558f" UNIQUE ("title"), CONSTRAINT "PK_50bde4df67295bf27cd0b7abe99" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}

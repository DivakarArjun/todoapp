import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  @Unique(['email'])
  @Entity('book')
  export class Book {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @Column({ length: 50, nullable: true })
    firstName: string;
  
    @Column({ length: 50, nullable: true })
    lastName: string;
  
    @Column({ length: 256 })
    email: string;
  
    @Column({ type: 'bigint', nullable: true })
    mobileNo: string;
  
    @Column()
    password: string;
      @Column({ length: 80, nullable: true })
    createdBy: string;
  
    @Column({ length: 80, nullable: true })
    updatedBy: string;
  
    @CreateDateColumn()
    createdAt: 'datetime';
  
    @UpdateDateColumn()
    updatedAt: 'datetime';
  }
  
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
  } from 'typeorm';
import { Userstatus } from '../users.model';
@Unique(['email'])
  @Entity('user')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @Column({ length: 50, nullable: true })
    firstName: string;
  
    @Column({ length: 50, nullable: true })
    lastName: string;
  
    @Column({ length: 256 })
    email: string;
  
    @Column({ default: Userstatus.active })
    status: Userstatus;
  
    @Column({ type: 'bigint', nullable: true })
    mobileNo: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    createdAt: 'datetime';
  
    @UpdateDateColumn()
    updatedAt: 'datetime';
  }
  
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Adminstatus } from '../admin.model';
@Unique(['email'])
@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  adminId: string;

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

  @Column({ default: Adminstatus.active })
  status: Adminstatus;

  @Column({ default: 'ADMIN' })
  userType: string;

  @Column({ default: null })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: 'datetime';

  @UpdateDateColumn()
  updatedAt: 'datetime';
}

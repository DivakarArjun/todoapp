import { User } from '../../users/entities/users.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
import { Taskstatus, TaskType } from '../tasks.model';
@Unique(['title'])
  @Entity('task')
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @Column({})
    title: string;
  
    @Column({})
    description: string;
  
    @Column({ default: TaskType.task })
    type: TaskType;
    
    @Column({ default: Taskstatus.pending })
    status: Taskstatus;
  
    @ManyToOne((type) => User, (user) => user.Id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    userId: string;

    @CreateDateColumn()
    createdAt: 'datetime';
  
    @UpdateDateColumn()
    updatedAt: 'datetime';
  }
  
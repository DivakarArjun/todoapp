import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { AddTaskDto, taskStatusDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>
      ) {}
    async findOne(id: string) {
        return await this.taskRepository.findOne(id);
    }
    
    async checkTaskExist(payload:any) {
      return await this.taskRepository.findOne(payload);
  }
    async checkUserExists(id: string) {
      return await this.userRepository.findOne(id);
    }
    async addTask(AddTaskDto: AddTaskDto) {
      return await this.taskRepository.save(AddTaskDto);
    }
    
    async updateTask(id:string,AddTaskDto: AddTaskDto) {
      return await this.taskRepository.update(id,AddTaskDto);
    }
    
    async deleteTask(id:string) {
      return await this.taskRepository.delete(id);
    }
    async findAllTask(
        limit: string,
        page: string,
        searchKey: string,
        status: string
      ) {
        let where = {};
    
        if (status) {
          where = { status: status };
        }
        if (searchKey) {
          where ={ title: searchKey, ...where }
        }
    
        const take = parseInt(limit);
        const currentPage = parseInt(page);
        const skip = (currentPage - 1) * take;
        let [result, total] = await this.taskRepository
          .createQueryBuilder('task')
          .leftJoin('task.userId', 'userId')
          .select([
            'task',
            'userId.Id',
            'userId.firstName',
            'userId.lastName',
            'userId.email'
          ])
          .where(where)
          .skip(skip)
          .take(take)
          .orderBy('task.createdAt', 'DESC')
          .getManyAndCount();
        return {
          pageCount: Math.ceil(total / take),
          count: total,
          page: currentPage,
          limit: take,
          data: result,
        };
    }
    async updateTaskStatus(taskId: string, taskStatusDto: any) {
      await this.taskRepository.update(taskId, taskStatusDto);
    }
    async assignTask(taskId: string, userId: string) {
      await this.taskRepository.update(taskId, {userId:userId});
    }
}

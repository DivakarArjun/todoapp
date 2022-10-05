/* eslint-disable prettier/prettier */
import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ILike,
  Repository,
} from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Admin } from './entities/admin.entity';



@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOne(id: string) {
    return await this.adminRepository.findOne(id);
  }
  async findUserDetails(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ Id: id })
      .select([
        'user'
      ])
      .getOne();
  }

  async checkAdminExists(payload: any) {
    return await this.adminRepository.findOne(payload);
  }
  async checkUserExists(payload: any) {
    return await this.userRepository.findOne(payload);
  }


  async findAllUser(
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
      where = [
        { firstname: searchKey, ...where },
        { lastname: searchKey, ...where },
        { email: ILike('%' + searchKey + '%'), ...where },
      ];
    }

    const take = parseInt(limit);
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * take;
    let [result, total] = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user' ])
      .where(where)
      .skip(skip)
      .take(take)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();
    return {
      pageCount: Math.ceil(total / take),
      count: total,
      page: currentPage,
      limit: take,
      data: result,
    };
  }

  async blockUnblockUser(userId: string, blockUnblockUserDto: any) {
    await this.userRepository.update(userId, blockUnblockUserDto);
  }

  async getAllUser() {
    return await this.userRepository.find();
  }
  
}

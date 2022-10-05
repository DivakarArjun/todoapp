import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './modules/admin/entities/admin.entity';
import { Md5 } from 'md5-typescript';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {
    this.addAdminDefault();
  }
  async addAdminDefault() {
    try {
        let createAdminDto: any = {};
        createAdminDto.email = process.env.EMAIL;
        createAdminDto.password = Md5.init(process.env.PASSWORD);
      await this.adminRepository
        .createQueryBuilder()
        .insert()
        .values(createAdminDto)
        .orIgnore()
        .execute();
    } catch (e) {
      console.log(e);
    }
  }

}

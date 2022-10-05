import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto, UserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    async findUserDetails(id: string) {
        return await this.userRepository.findOne(id);
    }
    async checkUserExists(payload: any) {
        return await this.userRepository.findOne(payload);
    }
    async addUser(payload:UserDto){
        return await this.userRepository.save(payload);
    }
    async editUser(id:string,payload:updateUserDto){
        return await this.userRepository.update(id,payload);
    }
    async deleteUser(id:string) {
        return await this.userRepository.delete(id);
    }
}

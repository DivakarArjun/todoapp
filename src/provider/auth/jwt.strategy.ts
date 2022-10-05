import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { Adminstatus } from 'src/modules/admin/admin.model';
import { User } from 'src/modules/users/entities/users.entity';
import { Userstatus } from 'src/modules/users/users.model';



@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'userjwt') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    if (payload.tokenType == 'Auth') {
      if (payload.userType == 'USER') {
        const checkUserExist: any = await this.userRepository.findOne({status:Userstatus.active,Id:payload.userId})
        if (checkUserExist) {
            return payload
        }
        return null;
      }
      return null;
    }
    return null;
  }
}

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'adminjwt') {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    if (payload.tokenType == 'Auth') {
      if (payload.userType == 'ADMIN') {
        const checkAdminExist: any = await this.adminRepository.findOne({status:Adminstatus.active,adminId:payload.adminId})
        if (checkAdminExist) {
            return payload
        }
        return null;
      }
      return null;
    }
    return null;
  }
}

@Injectable()
export class JwtBothStrategy extends PassportStrategy(Strategy, 'bothjwt') {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    if (payload.tokenType == 'Auth') {
      if (payload.userType == 'ADMIN') {
        const checkAdminExist: any = await this.adminRepository.findOne({status:Adminstatus.active,adminId:payload.adminId})
        if (checkAdminExist) {
            return payload
        }
      }
      else if (payload.userType == 'USER') {
        const checkUserExist: any = await this.userRepository.findOne({status:Userstatus.active,Id:payload.userId})
        if (checkUserExist) {
            return payload
        }
        return null;
      }
      return null;
    }
    return null;
  }
}


import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { User } from 'src/modules/users/entities/users.entity';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

  public async TokenGenerateForUser(
    user: User,
    tokenType: string
  ): Promise<any> {
    const payload = {
      userId: user.Id,
      email: user.email,
      userType: "USER",
      createdAt: user.createdAt,
      tokenType: tokenType || 'authToken',
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
    };
  }
  
  public async TokenGenerateForAdmin(
    admin: Admin,
    tokenType: string
  ): Promise<any> {
    const payload = {
      adminId: admin.adminId,
      email: admin.email,
      userType: "ADMIN",
      createdAt: admin.createdAt,
      tokenType: tokenType || 'authToken',
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
    };
  }
}

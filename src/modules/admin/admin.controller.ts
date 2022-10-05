import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Res,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

import {
  adminLoginDto,
  generalId,
  blockUnblockUserDto,
  PaginationWithStatus,

} from './dto/create-admin.dto';
import { httpResponse } from '../../middleware/httpResponse';
import {
  COMMANRESPONSE
} from '../../comman/comman.response';
import { AuthService } from '../../provider/auth/auth.service';
import { Response } from 'express';
import { Md5 } from 'md5-typescript';
import { JwtAdminStrategy } from 'src/provider/auth/jwt-auth.guard';
var CryptoJS = require('crypto-js');

// Decrypting text
function decrypt(text) {
  var bytes = CryptoJS.AES.decrypt(text, '123wertcgavg789hdkk');
  return bytes.toString(CryptoJS.enc.Utf8);
}


@ApiTags('Admin module')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly httpResponse: httpResponse,
    private readonly authService: AuthService
  ) {}


  /**
   * @author Todo
   * @description This function will used get a details of admin
   * @query
   * @payload
   */
  @UseGuards(JwtAdminStrategy)
  @Get('/details')
  @ApiBearerAuth()
  async findAdminDetails(@Request() req, @Res() response: Response) {
    try {
      const adminDetails = await this.adminService.findOne(req.user.adminId);
      if (!adminDetails) {
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.ERROR,
          {},
        );
        return resp;
      }
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ADMIN_DETAILS,
        adminDetails,
      );
      return resp;
    } catch (e) {
      console.log(e);
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ERROR,
      );
      return resp;
    }
  }


  /**
   * @author Todo
   * @description This function will used for admin login
   * @Body adminLoginDto
   * @payload email and password
   */
  @Post('/login')
  @ApiOperation({ summary: 'Admin Login api' })
  async adminLogin(
    @Body() adminLoginDto: adminLoginDto,
    @Res() response: Response,
  ) {
    try {
      const result: any = {};
      let findAdmin: any = await this.adminService.checkAdminExists({
        where: { email: adminLoginDto.email },
      });
      if (!findAdmin) {
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.EMAIL_NOT_REGISTERED,
        );
        return resp;
      }
      if (Md5.init(adminLoginDto.password) != findAdmin.password) {
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.INCORRECT_PASSWORD,
        );
        return resp;
      }
      findAdmin['createdAt'] = new Date();
      const token = await this.authService.TokenGenerateForAdmin(
        findAdmin,
        'Auth',
      );
      result.token = token.accessToken;
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ADMIN_LOGIN,
        result,
      );
      return resp;
    } catch (e) {
      console.log(e);
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ERROR,
      );
      return resp;
    }
  }
  /**
   * @author Todo
   * @description This function will used to get list of all user
   * @query PaginationWithStatus
   * @payload limit and page
   */

  @UseGuards(JwtAdminStrategy)
  @Get('/userList')
  @ApiBearerAuth()
  async findUserList(
    @Query() Pagination: PaginationWithStatus,
    @Request() req,
    @Res() response: Response,
  ) {
    try {
      const userDetails: any = await this.adminService.findAllUser(
        Pagination.limit,
        Pagination.page,
        Pagination.searchKey,
        Pagination.status
      );
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.USER_DETAILS,
        userDetails,
      );
      return resp;
    } catch (e) {
      console.log(e);
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ERROR,
      );
      return resp;
    }
  }

  /**
   * @author Todo
   * @description This function will used to get details of a specific user
   * @Param generalId
   * @payload id
   */

  @UseGuards(JwtAdminStrategy)
  @Get('user/:id')
  @ApiBearerAuth()
  async findUserDetails(
    @Param() generalId: generalId,
    @Res() response: Response,
  ) {
    try {
      const userDetails = await this.adminService.findUserDetails(generalId.id);
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.USER_DETAILS,
        userDetails,
      );
      return resp;
    } catch (e) {
      console.log(e);
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ERROR,
      );
      return resp;
    }
  }

  /**
   * @author Todo
   * @description This function will used to block unblock user
   * @Param generalId
   * @Body blockUnblockUserDto
   * @payload status
   */

   @UseGuards(JwtAdminStrategy)
   @Put('/blockUnblockUser/:id')
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Block and Unblock user API' })
   async blockUnblockUser(
     @Param() generalId: generalId,
     @Body() blockUnblockUserDto: blockUnblockUserDto,
     @Res() response: Response,
     @Request() req,
   ) {
     try {
       const checkUser = await this.adminService.checkUserExists(generalId.id);
       if (checkUser) {
         blockUnblockUserDto.updatedBy = req.user.adminId;
         if (blockUnblockUserDto.status == 2) {
           await this.adminService.blockUnblockUser(
             generalId.id,
             blockUnblockUserDto,
           );
 
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.USER_UNBLOCKED,
           );
           return resp;
         } else if (blockUnblockUserDto.status == 1) {
           await this.adminService.blockUnblockUser(
             generalId.id,
             blockUnblockUserDto,
           );
 
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.USER_UNBLOCKED,
           );
           return resp;
         } else {
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.INVALID_STATUS,
           );
           return resp;
         }
       }
       const resp = this.httpResponse.sendResponse(
         response,
         COMMANRESPONSE.USER_NOT_EXISTS,
       );
       return resp;
     } catch (e) {
       console.log(e);
       const resp = this.httpResponse.sendResponse(
         response,
         COMMANRESPONSE.ERROR,
       );
       return resp;
     }
   }
 


}

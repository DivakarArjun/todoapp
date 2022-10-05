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
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { Md5 } from 'md5-typescript';
import { COMMANRESPONSE } from 'src/comman/comman.response';
import { httpResponse } from 'src/middleware/httpResponse';
import { AuthService } from 'src/provider/auth/auth.service';
import { JwtUserStrategy } from 'src/provider/auth/jwt-auth.guard'
import { updateUserDto, UserDto, userLoginDto } from './dto/create-user.dto';
import { Userstatus } from './users.model';
import { UserService } from './users.service';

@Controller('User')
export class UserController {
    constructor(
        private readonly httpResponse: httpResponse,
        private readonly authService: AuthService,
        private UserService:UserService
  ){}
   /**
   * @author Todo
   * @description This function will used for user login
   * @Body userLoginDto
   * @payload email and password
   */
    @Post('/login')
    @ApiOperation({ summary: 'User Login api' })
    async userLogin(
      @Body() userLoginDto: userLoginDto,
      @Res() response: Response,
    ) {
      try {
        const result: any = {};
        let findUser: any = await this.UserService.checkUserExists({
          where: { email: userLoginDto.email },
        });
        if (!findUser) {
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.EMAIL_NOT_REGISTERED,
          );
          return resp;
        }
        if (Md5.init(userLoginDto.password) != findUser.password) {
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.INCORRECT_PASSWORD,
          );
          return resp;
        }
        if (Userstatus.active != findUser.status) {
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.USER_NOT_ACTIVE,
          );
          return resp;
        }
        
        findUser['createdAt'] = new Date();
        const token = await this.authService.TokenGenerateForUser(
          findUser,
          'Auth',
        );
        result.token = token.accessToken;
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.USER_LOGIN,
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
   * @author Millie
   * @description This function will used to get detail of news and promotion
   * @param generalId
   */
    @UseGuards(JwtUserStrategy)
    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user detail API' })
    async getuserById(
      @Request() req,
      @Res() response: Response,
    ) { 
      console.log(req.user);
      try {
        const userDetails = await this.UserService.findUserDetails(req.user.userId);
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
   * @description This function will used to add user
   * @param UserDto
   */
     @UseGuards(JwtUserStrategy)
     @Post('/')
     @ApiBearerAuth()
     @ApiOperation({ summary: 'signup user API' })
     async userSignup(
       @Body() UserDto: UserDto,
       @Res() response: Response,
     ) {
       try {
         const findUser = await this.UserService.checkUserExists({
           where: { email: UserDto.email },
         });
         if (findUser) {
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.USER_ALREADY_EXIST,
           );
           return resp;
         } 
         UserDto.password= Md5.init(UserDto.password)
         const detail = await this.UserService.addUser(UserDto);
         const resp = this.httpResponse.sendResponse(
           response,
           COMMANRESPONSE.USER_SIGNUP
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
    * @description This function will used to update task
    * @param AddTaskDto
    */
      @UseGuards(JwtUserStrategy)
      @Delete('/')
      @ApiBearerAuth()
      @ApiOperation({ summary: 'Delete user API' })
      async deleteTask(
        @Request() req,
        @Res() response: Response,
      ) {
        try {
          const findTask = await this.UserService.findUserDetails(req.user.userId);
          if (!findTask) {
            const resp = this.httpResponse.sendResponse(
              response,
              COMMANRESPONSE.USER_NOT_EXISTS,
            );
            return resp;
          } 
          const detail = await this.UserService.deleteUser(req.user.userId);
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.DELETE_USER
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
    * @description This function will used to update user
    * @param updateUserDto
    */
      @UseGuards(JwtUserStrategy)
      @Put('/')
      @ApiBearerAuth()
      @ApiOperation({ summary: 'Update user API' })
      async updateUser(
        @Request() req,
        @Body() updateUserDto: updateUserDto,
        @Res() response: Response,
      ) {
        try {
          const findUser = await this.UserService.checkUserExists(req.user.userId);
          if (!findUser) {
            const resp = this.httpResponse.sendResponse(
              response,
              COMMANRESPONSE.USER_NOT_EXISTS,
            );
            return resp;
          } 
          updateUserDto.password= Md5.init(updateUserDto.password)
          const detail = await this.UserService.editUser( req.user.userId,updateUserDto);
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.UPDATE_USER
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

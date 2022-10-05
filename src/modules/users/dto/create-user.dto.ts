/* eslint-disable prettier/prettier */
import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsObject,
    IsOptional,
    ValidateNested,
  } from 'class-validator';
  import {
    ApiHideProperty,
    ApiProperty,
    ApiPropertyOptional,
    ApiQuery,
  } from '@nestjs/swagger';
  import { Userstatus } from 'src/modules/users/users.model';
export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    lastName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    mobileNo: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
  }

  export class updateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    lastName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    mobileNo: string;
    
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
  }
  
  export class userLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
  }
  
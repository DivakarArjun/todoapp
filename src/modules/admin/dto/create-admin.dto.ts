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
import {
  Adminstatus,
  QuestionTypestatus,
  Categorystatus,
  blogStatus,
  blogType,
  expertStatus,
  userType,
  eventStatus,
  birthPlanStatus,
  QuestionType,
  healthStatus,
  groupType,
  contentType,
  eventType,
  newsStatus,
} from '../admin.model';
import { Userstatus } from 'src/modules/users/users.model';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class adminLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class Pagination {
  @ApiProperty()
  limit: string;

  @ApiProperty()
  page: string;

  @ApiPropertyOptional()
  searchKey?: string;
}

export class generalId {
  @ApiProperty()
  id: string;
}

export class updateUserDto {
  @ApiProperty()
  profilePicture?: string;

  @ApiProperty()
 // @IsNotEmpty()
  displayName: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  citystate: string;

  @ApiProperty()
  dob: 'date';

  /*@ApiProperty()
  @IsNotEmpty()
  bio : string;*/

  @ApiProperty()
  pregnancyQuestionSet: boolean;

  @ApiPropertyOptional()
  preferredPronoun?: string;

  @ApiPropertyOptional()
  actual_due_date?: 'date';

  
  @ApiPropertyOptional()
  email?: string;


  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  mobileNo: string;

}

export class blockUnblockUserDto {
  @ApiProperty({
    description: '1-active,2-blocked',
  })
  status: Userstatus;

  @ApiHideProperty()
  updatedBy?: string;
}

export class PaginationWithStatus {
  @ApiProperty()
  limit: string;

  @ApiProperty()
  page: string;

  @ApiPropertyOptional()
  searchKey?: string;

  @ApiPropertyOptional({
    description: '0=inactive,1=active,2=blocked',
  })
  status?: string;
}

export class PaginationStatus {
  @ApiProperty()
  limit: string;

  @ApiProperty()
  page: string;

  @ApiPropertyOptional()
  searchKey?: string;

  @ApiPropertyOptional({
    description: '0=inactive,1=active',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'yyyy-mm-dd',
  })
  fromDate?: 'date';

  @ApiPropertyOptional({
    description: 'yyyy-mm-dd',
  })
  endDate?: 'date';
}
export class PaginationUser {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  limit: string;

  @ApiProperty()
  page: string;
}
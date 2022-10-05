
import {
    ApiHideProperty,
    ApiProperty,
    ApiPropertyOptional,
    ApiQuery,
  } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TaskType } from '../tasks.model';
  
export class generalId {
    @ApiProperty()
    id: string;
  }
export class AddTaskDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty({
      description:"0=task,1=bug,2=improvment,3=feature"
    })
    type: TaskType;
}

  
export class paginationWithStatus {
  @ApiProperty()
  limit?: string;

  @ApiProperty()
  page: string;

  @ApiPropertyOptional()
  searchKey?: string;

  @ApiPropertyOptional({
    description: '0=pending,1=inprogress,2=qa,3=Done,4=closed',
  })
  status?: string;
}

export class Pagination {
  @ApiProperty()
  limit: string;

  @ApiProperty()
  page: string;
}
export class taskStatusDto {
  @ApiProperty({
    description: '0=pending,1=inprogress,2=qa,3=Done,4=closed',
  })
  status: string;
}
export class assignTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
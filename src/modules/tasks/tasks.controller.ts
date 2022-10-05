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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { COMMANRESPONSE } from 'src/comman/comman.response';
import { httpResponse } from 'src/middleware/httpResponse';
import { JwtBothStrategy } from 'src/provider/auth/jwt-auth.guard';
import { JwtAdminStrategy, JwtUserStrategy } from 'src/provider/auth/jwt.strategy';
import { Not } from 'typeorm';
import { AddTaskDto, assignTaskDto, generalId, paginationWithStatus, taskStatusDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly httpResponse: httpResponse,
        private readonly taskService:TasksService
    ){}
    /**
   * @author Todo
   * @description This function will used to get detail of task
   * @param generalId
   */
  @UseGuards(JwtBothStrategy)
  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get task detail API' })
  async getTaskById(
    @Param() generalId: generalId,
    @Res() response: Response,
  ) {
    try {
      const taskDetails = await this.taskService.findOne(generalId.id); 
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.TASK_DETAIL,
        taskDetails
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
   * @description This function will used to add task
   * @param AddTaskDto
   */
    @UseGuards(JwtBothStrategy)
    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add task API' })
    async addTask(
      @Body() AddTaskDto: AddTaskDto,
      @Res() response: Response,
    ) {
      try {
        const findTask = await this.taskService.checkTaskExist({
          where: { title: AddTaskDto.title },
        });
        if (findTask) {
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.TASK_NOT_EXISTS,
          );
          return resp;
        } 
        const detail = await this.taskService.addTask(AddTaskDto);
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.ADD_TASK
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
     @UseGuards(JwtBothStrategy)
     @Delete('/:id')
     @ApiBearerAuth()
     @ApiOperation({ summary: 'Delete task API' })
     async deleteTask(
      @Param() generalId: generalId,
       @Res() response: Response,
     ) {
       try {
         const findTask = await this.taskService.findOne(generalId.id);
         if (findTask) {
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.TASK_NOT_EXISTS,
           );
           return resp;
         } 
         const detail = await this.taskService.deleteTask( generalId.id);
         const resp = this.httpResponse.sendResponse(
           response,
           COMMANRESPONSE.DELETE_TASK
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
   * @description This function will used to delete task
   * @param AddTaskDto
   */
     @UseGuards(JwtBothStrategy)
     @Put('/:id')
     @ApiBearerAuth()
     @ApiOperation({ summary: 'Update task API' })
     async updateTask(
      @Param() generalId: generalId,
       @Body() AddTaskDto: AddTaskDto,
       @Res() response: Response,
     ) {
       try {
         const findTask = await this.taskService.checkTaskExist({
           where: { title: AddTaskDto.title,Id:Not(generalId.id) },
         });
         if (findTask) {
           const resp = this.httpResponse.sendResponse(
             response,
             COMMANRESPONSE.TASK_NOT_EXISTS,
           );
           return resp;
         } 
         const detail = await this.taskService.updateTask( generalId.id,AddTaskDto);
         const resp = this.httpResponse.sendResponse(
           response,
           COMMANRESPONSE.UPDATE_TASK
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
   * @description This function will used to get all task
   * @param generalId
   */
  
   @UseGuards(JwtBothStrategy)
   @Get('/')
   @ApiBearerAuth()
   async findTaskList(
     @Query() Pagination: paginationWithStatus,
     @Request() req,
     @Res() response: Response,
   ) {
     try {
       const taskList: any = await this.taskService.findAllTask(
         Pagination.limit,
         Pagination.page,
         Pagination.searchKey,
         Pagination.status
       );
       const resp = this.httpResponse.sendResponse(
         response,
         COMMANRESPONSE.TASK_LIST,
         taskList,
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
   * @description This function will used to change task status
   * @Param generalId
   * @Body activeInactiveBlogDto
   * @payload status
   */

  @UseGuards(JwtBothStrategy)
  @Put('/changeTaskStatus/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change Task status' })
  async changeTaskStatus(
    @Param() generalId: generalId,
    @Body() taskStatusDto: taskStatusDto,
    @Res() response: Response,
    @Request() req,
  ) {
    try {
      const checkTask = await this.taskService.findOne(generalId.id);
      if (checkTask) {
          await this.taskService.updateTaskStatus(
            generalId.id,
            taskStatusDto,
          );
          const resp = this.httpResponse.sendResponse(
            response,
            COMMANRESPONSE.TASK_STATUS_UPDATE,
          );
          return resp;
      }
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.TASK_NOT_EXISTS,
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
   * @description This function will used to assign a task of user
   * @Body assignTaskDto
   * @payload userId, taskId 
   */
   @UseGuards(JwtBothStrategy)
   @Patch('/assignTask')
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Assign Task' })
   async assignTaskDto(
     @Body() assignTaskDto: assignTaskDto,
     @Res() response: Response,
     @Request() req,
   ) {
     try {
       const checkTask = await this.taskService.findOne(assignTaskDto.taskId);
       if (!checkTask) {
         const resp = this.httpResponse.sendResponse(
           response,
           COMMANRESPONSE.TASK_NOT_EXISTS,
         );
         return resp;
       }
       const userDetails = await this.taskService.checkUserExists(assignTaskDto.userId);
       if (!userDetails) {
         const resp = this.httpResponse.sendResponse(
           response,
           COMMANRESPONSE.USER_NOT_EXISTS,
         );
         return resp;
       }
        await this.taskService.assignTask(
          assignTaskDto.taskId,
          assignTaskDto.userId,
        );
          
        const resp = this.httpResponse.sendResponse(
          response,
          COMMANRESPONSE.ASSIGN_TASK,
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

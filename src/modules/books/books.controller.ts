import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { COMMANRESPONSE } from 'src/comman/comman.response';
import { httpResponse } from 'src/middleware/httpResponse';
import { JwtLocalStrategy } from 'src/provider/auth/jwt.strategy';

@Controller('books')
export class BooksController {
        constructor(
            private readonly httpResponse: httpResponse,
        ){}
     /**
   * @author Millie
   * @description This function will used to get detail of news and promotion
   * @param generalId
   */
  @UseGuards(JwtLocalStrategy)
  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get news and promotion detail API' })
  async getnewsAndPromotionById(
    @Param() generalId: any,
    @Res() response: Response,
  ) {
    try {
      const resp = this.httpResponse.sendResponse(
        response,
        COMMANRESPONSE.ADMIN_LOGIN
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

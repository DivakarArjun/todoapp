import { Response } from 'express';

export class httpResponse {
  //constructor() {}

  /** response from the server */
  async sendResponse(r: Response, b: any, d: any = {}) {
    b.data = d;
    r.status(b.httpCode).json(b);
  }


}

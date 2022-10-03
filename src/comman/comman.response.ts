import { HTTP } from "./code.responses";
export const ADMINMSG = {
    ERROR: `Something went wrong. Please contact support@millieclinic.com if the issue continues.`,
    ADMIN_LOGIN: 'Admin login successfulsssly',
}
export const COMMANRESPONSE = {
    ADMIN_LOGIN: {
      httpCode: HTTP.SUCCESS,
      statusCode: HTTP.SUCCESS,
      message: ADMINMSG.ADMIN_LOGIN,
    },
    ERROR: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.ERROR,
    }
}
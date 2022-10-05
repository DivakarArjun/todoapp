import { HTTP } from "./code.responses";
export const ADMINMSG = {
    ERROR: `Something went wrong. Please contact support@millieclinic.com if the issue continues.`,
    ADMIN_LOGIN: 'Admin login successfully',
    USER_LOGIN: 'User login successfully',
    TASK_DETAIL:"Task detail get successfully.",
    TASK_LIST:"All task get successfulssly. ",
    ADMIN_DETAILS:"Admin detail get successfully.",
    EMAIL_NOT_REGISTERED: `We're having trouble finding your account. Please try again or reach out to us with any questions.`,
    INCORRECT_PASSWORD: `We don't recognize that email and password combination. Please try again or contact us for support.`,
    USER_DETAILS:"User detail get successfully.",
    USER_BLOCKED: 'User is blocked by Admin',
    USER_UNBLOCKED: 'User is unblocked by Admin',
    INVALID_STATUS: 'Status invalid',
    USER_NOT_EXISTS: 'User does not exists',
    TASK_NOT_EXISTS:"Task not exist.",
    TASK_STATUS_UPDATE:"Task status update.",
    ASSIGN_TASK:"Assign task successfully.",
    ADD_TASK:"Add task successfully.",
    UPDATE_TASK:"Update task successfully.",
    DELETE_TASK:"Delete task successfully.",
    USER_ALREADY_EXIST:"User already exist",
    USER_SIGNUP:"User signup successfully",
    UPDATE_USER:"Update user successfully.",
    DELETE_USER:"Delete user successfully.",
    USER_NOT_ACTIVE:"User is not active."
}
export const COMMANRESPONSE = {
    ADMIN_LOGIN: {
      httpCode: HTTP.SUCCESS,
      statusCode: HTTP.SUCCESS,
      message: ADMINMSG.ADMIN_LOGIN,
    },
    USER_SIGNUP:{
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.USER_SIGNUP,
    },
    USER_LOGIN: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.USER_LOGIN,
      },
    ERROR: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.ERROR,
    },
    ADMIN_DETAILS: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.ADMIN_DETAILS,
    },
    TASK_DETAIL: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.TASK_DETAIL,
    },
    ADD_TASK: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.ADD_TASK,
    },
    UPDATE_TASK: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.UPDATE_TASK,
    },
    DELETE_TASK: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.DELETE_TASK,
    },
    UPDATE_USER: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.UPDATE_USER,
    },
    DELETE_USER: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.DELETE_USER,
    },
    USER_NOT_ACTIVE:{
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.USER_NOT_ACTIVE
    },
    EMAIL_NOT_REGISTERED: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.EMAIL_NOT_REGISTERED,
      },
    TASK_LIST:{
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.TASK_LIST,
    },
    INCORRECT_PASSWORD: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.INCORRECT_PASSWORD,
      },
    USER_DETAILS: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.USER_DETAILS,
    },
    SER_BLOCKED: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.USER_BLOCKED,
    },
    USER_UNBLOCKED: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.USER_UNBLOCKED,
    },
    INVALID_STATUS: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.INVALID_STATUS,
    },
    USER_NOT_EXISTS: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.USER_NOT_EXISTS,
    },
    USER_ALREADY_EXIST: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.USER_ALREADY_EXIST,
    },
    TASK_NOT_EXISTS:{
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: ADMINMSG.TASK_NOT_EXISTS,
    },
    TASK_STATUS_UPDATE:{
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.TASK_STATUS_UPDATE,
    },
    ASSIGN_TASK:{
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: ADMINMSG.ASSIGN_TASK
    }
}
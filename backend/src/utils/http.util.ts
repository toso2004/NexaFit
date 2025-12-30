import { Response } from 'express'

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NOT_ACCEPTED = 204,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

/**
 * A standard shape for api responses
 * This ensures that all of our api responses look the same
 */
export interface ApiResponse<T = any> {
    success: boolean,
    message: string,
    data: T,
    error: any
}

export function sendSuccess<T> (
    res : Response,
    data: T,
    status: HttpStatusCode = HttpStatusCode.OK
): Response<ApiResponse<T>>{
    return res.status(status).json({
        success: true,
        data
    })
}

export function sendCreated<T> (
    res : Response,
    data: T,
    status: HttpStatusCode = HttpStatusCode.CREATED
): Response<ApiResponse<T>>{
    return res.status(status).json({
        success: true,
        data
    })
}

export function sendInternalError<T> (
    res : Response,
    message: string,
    status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    error?: any
): Response<ApiResponse<null>>{
    return res.status(status).json({
        success: false,
        message,
        error
    })
}

export function badRequest(res: Response, message: string, error?: any) {
  return sendInternalError(res, message, HttpStatusCode.BAD_REQUEST, error);
}

export function unauthorized(res: Response, message: string, error?: any) {
  return sendInternalError(res, message, HttpStatusCode.UNAUTHORIZED, error);
}

export function forbidden(res: Response, message: string, error?: any) {
  return sendInternalError(res, message, HttpStatusCode.FORBIDDEN, error);
}

export function notFound(res: Response, message: string, error?: any) {
  return sendInternalError(res, message, HttpStatusCode.NOT_FOUND, error);
}

export function serverError(res: Response, message: string, error?: any) {
  return sendInternalError(res, message, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
}
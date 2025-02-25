import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import type { ZodError } from 'zod'
import { __IS_PROD__ } from '../config'
import type { ActivityControllerMessageDetails } from '../services'

export * from './debug'

export const ErrorTypes = {
  BAD_REQUEST: 'bad_request',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not_found',
  METHOD_NOT_ALLOWED: 'method_not_allowed',
  CONFLICT: 'conflict',
  UNSUPPORTED_MEDIA_TYPE: 'unsupported_media_type',
  UNPROCESSABLE_ENTITY: 'unprocessable_entity',
  TOO_MANY_REQUESTS: 'too_many_requests',
  INTERNAL_SERVER_ERROR: 'internal_server_error',
  NOT_IMPLEMENTED: 'not_implemented',
  SERVICE_UNAVAILABLE: 'service_unavailable',

  VALIDATION_ERROR: 'validation_error'
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]

export interface OktusErrorOptions {
  type: ErrorType
  message?: string
  status?: StatusCodes
  details?: ActivityControllerMessageDetails
  cause?: Error
}

export interface OktusErrorResponse {
  name: string
  type: ErrorType
  status: StatusCodes
  message: string
  details?: ActivityControllerMessageDetails
  stack?: string
}

export class OktusError extends Error {
  readonly type: ErrorType
  readonly status: StatusCodes
  readonly requestId?: string
  readonly details?: ActivityControllerMessageDetails

  constructor(options: OktusErrorOptions) {
    const message =
      options.message ?? getReasonPhrase(options.status ?? StatusCodes.INTERNAL_SERVER_ERROR)

    super(message)
    this.name = this.constructor.name
    this.type = options.type
    this.status = options.status ?? StatusCodes.INTERNAL_SERVER_ERROR
    this.details = options.details

    if (options.cause) {
      this.cause = options.cause
    }

    Error.captureStackTrace(this, this.constructor)
  }

  toJSON(): OktusErrorResponse {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      status: this.status,
      details: this.details,
      stack: __IS_PROD__ ? this.stack : undefined
    }
  }
}

export class BadRequestError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.BAD_REQUEST,
      message: message,
      status: StatusCodes.BAD_REQUEST,
      details: {
        help: 'Check if you have provided the correct parameters',
        ...details
      }
    })
  }
}

export class UnauthorizedError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.UNAUTHORIZED,
      message: message,
      status: StatusCodes.UNAUTHORIZED,
      details: {
        help: 'Check if you are authenticated',
        ...details
      }
    })
  }
}

export class ForbiddenError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.FORBIDDEN,
      message: message,
      status: StatusCodes.FORBIDDEN,
      details: {
        help: 'Check if you have the necessary permissions',
        ...details
      }
    })
  }
}

export class NotFoundError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.NOT_FOUND,
      message: message,
      status: StatusCodes.NOT_FOUND,
      details: {
        help: 'Check if the resource exists',
        ...details
      }
    })
  }
}

export class MethodNotAllowedError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.METHOD_NOT_ALLOWED,
      message: message,
      status: StatusCodes.METHOD_NOT_ALLOWED,
      details: {
        help: 'Check if you are using the correct HTTP method',
        ...details
      }
    })
  }
}

export class ConflictError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.CONFLICT,
      message: message,
      status: StatusCodes.CONFLICT,
      details: {
        help: 'Check if the resource is in a conflicting state',
        ...details
      }
    })
  }
}

export class UnsupportedMediaTypeError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.UNSUPPORTED_MEDIA_TYPE,
      message: message,
      status: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      details: {
        help: 'Check if you are using the correct content type',
        ...details
      }
    })
  }
}

export class UnprocessableEntityError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.UNPROCESSABLE_ENTITY,
      message: message,
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      details: {
        help: 'Check if you have provided the correct parameters',
        ...details
      }
    })
  }
}

export class TooManyRequestsError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.TOO_MANY_REQUESTS,
      message: message,
      status: StatusCodes.TOO_MANY_REQUESTS,
      details: {
        help: 'You have exceeded the rate limit',
        ...details
      }
    })
  }
}

export class InternalServerError extends OktusError {
  constructor(message?: string, details?: ActivityControllerMessageDetails) {
    super({
      type: ErrorTypes.INTERNAL_SERVER_ERROR,
      message: message,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      details: {
        help: 'Unexpected error occurred',
        ...details
      }
    })
  }
}

export class ValidationError extends OktusError {
  constructor(
    readonly errors: InnerValidationError[],
    message?: string,
    details?: ActivityControllerMessageDetails
  ) {
    super({
      type: ErrorTypes.VALIDATION_ERROR,
      message: message ?? 'Validation failed',
      status: StatusCodes.BAD_REQUEST,
      details: {
        help: 'Check if you have provided the correct parameters',
        errors: errors.map((error) => error.errors),
        ...details
      }
    })

    this.errors = errors
  }
}

export const InnerValidationErrorTypes = {
  QUERY: 'query',
  PARAMS: 'params',
  BODY: 'body'
} as const
export type InnerValidationErrorType =
  (typeof InnerValidationErrorTypes)[keyof typeof InnerValidationErrorTypes]
export class InnerValidationError {
  constructor(readonly validationType: InnerValidationErrorType, readonly errors: ZodError) {
    this.errors = errors
    this.validationType = validationType
  }
}

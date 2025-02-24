import { createConsola, InputLogObject } from 'consola'
import { type Request, type Response } from 'express'
import { DebugLevel, InnerValidationError, OktusError, OktusErrorResponse } from '../errors'
import { generateId } from '../utils'
import { ZodError } from 'zod'

export interface ActivityControllerMessageDetails {
  id?: string
  code?: number
  message?: string
  debugLevel?: DebugLevel
  help?: any
  createdAt?: string
  resource?: string
  details?: any
  errors?: Array<InnerValidationError | ZodError | Error>
  stack?: string
  timestamp?: string
  [key: string]: any
}

export interface ActivityControllerMessageResponse {
  message: string
  team: string
  details: ActivityControllerMessageDetails
}

const consola = createConsola()

export class ActivityController {
  static sendError(req: Request, res: Response, err: OktusError) {
    const errorResponse = this.generateErrorResponse(req, err)

    this.logError(err)
    this.log(
      { type: 'box', message: JSON.stringify(errorResponse, null, 2), tag: 'siudb' },
      DebugLevel.ERROR
    )

    res.setHeader('Content-Type', 'application/json')
    return res.status(err.status).json(errorResponse)
  }

  static generateErrorResponse(req: Request, err: OktusError): OktusErrorResponse {
    const id = generateId()
    const url = req.originalUrl
    const method = req.method
    const timestamp = new Date().toISOString()

    const errorResponse = err.toJSON()

    errorResponse.details = {
      ...errorResponse.details,
      id,
      method,
      url,
      timestamp
    }

    return errorResponse
  }

  static logError(err: Error) {
    consola.error(err)
  }

  static log(message: InputLogObject, level: DebugLevel = DebugLevel.INFO) {
    return consola[level](message)
  }
}

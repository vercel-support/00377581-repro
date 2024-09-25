import { NextFunction, Request, Response } from 'express'
import { ActivityController } from '../services'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _: NextFunction) => {
  const statusCode =
    res.statusCode === StatusCodes.NOT_FOUND ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR

  ActivityController.sendMessage(req, res, statusCode, {
    message: err instanceof Error ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
    debugLevel: 'error',
    help: 'Unexpected error',
    stack:
      process.env.NODE_ENV === 'production'
        ? err instanceof Error
          ? err.stack
          : 'unknown'
        : undefined
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND)
  const error = new Error(`${ReasonPhrases.NOT_FOUND} - ${req.originalUrl}`)
  next(error)
}

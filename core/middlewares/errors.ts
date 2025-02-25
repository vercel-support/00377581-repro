import type { NextFunction, Request, Response } from 'express'
import { InternalServerError, NotFoundError, OktusError } from '../errors'
import { ActivityController } from '../services'

export const errorHandler = (err: unknown, req: Request, res: Response, _: NextFunction): void => {
  ActivityController.log({ message: 'HIT', type: 'box' })
  if (err instanceof OktusError) {
    ActivityController.sendError(req, res, err)
  } else {
    ActivityController.sendError(req, res, new InternalServerError())
  }
}

export const notFound = (req: Request, _: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`))
}

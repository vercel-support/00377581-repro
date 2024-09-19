import { NextFunction, Request, Response } from 'express'
import { initDb } from '../services'

export const dbConnection = async (_: Request, __: Response, next: NextFunction) => {
  await initDb()
  next()
}

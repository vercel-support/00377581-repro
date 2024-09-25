import express, { Express, Router, RouterOptions, RequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import {
  dbConnection,
  errorHandler,
  globalMinuteRateLimiter,
  globalSecondRateLimiter,
  globalSpeedLimiter
} from './middlewares'

export const _app = express()
const createRouter: (options?: RouterOptions) => Router = express.Router
export const router = createRouter()

// Express definitions
_app.set('trust proxy', 1)

// Global middlewares
if (process.env.NODE_ENV === 'production') {
  _app.use(globalMinuteRateLimiter)
  _app.use(globalSecondRateLimiter)
  _app.use(globalSpeedLimiter)
}

_app.use(express.json({ limit: '5mb' }) as RequestHandler)
_app.use(express.urlencoded({ extended: true }) as RequestHandler)
_app.use(express.static('public') as RequestHandler)

// Security middlewares
_app.use(cors())
_app.use(
  helmet({
    dnsPrefetchControl: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: true,
    xssFilter: true
  }) as RequestHandler
)

// Custom middlewares
_app.use(dbConnection)
_app.use(errorHandler)

export default process.env.NODE_ENV === 'production' ? _app : (router as Express)

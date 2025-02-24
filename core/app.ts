import cors from 'cors'
import express, { type Express, type Router, type RouterOptions } from 'express'
import helmet from 'helmet'
import { __IS_PROD__ } from './config'
import {
  errorHandler,
  // globalMinuteRateLimiter,
  // globalSecondRateLimiter,
  // globalSpeedLimiter,
  parseQueryParams
} from './middlewares'

export const _app = express()
const createRouter: (options?: RouterOptions) => Router = express.Router
export const router = createRouter()

// Express definitions
_app.set('trust proxy', 1) // Trust Vercel

// Global middlewares
// if (__IS_PROD__) {
//   _app.use(globalMinuteRateLimiter)
//   _app.use(globalSecondRateLimiter)
//   _app.use(globalSpeedLimiter)
// }

_app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Oktus')
  res.setHeader('Content-Type', 'application/json')
  next()
})
_app.use(express.json({ limit: '5mb' }))
_app.use(express.urlencoded({ extended: true }))
_app.use(express.static('public'))

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
  })
)

// Custom middlewares
_app.use(parseQueryParams)

if (__IS_PROD__) {
  _app.use(errorHandler)
}

export default __IS_PROD__ ? _app : (router as Express)

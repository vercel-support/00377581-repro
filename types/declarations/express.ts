import { RateLimitInfo } from 'express-rate-limit'
import { SlowDownInfo } from 'express-slow-down'

declare module 'express-serve-static-core' {
  interface Request {
    rateLimit?: RateLimitInfo
    slowDown?: SlowDownInfo
  }
}

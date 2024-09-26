import { rateLimit, Options } from 'express-rate-limit'
import { globalMinuteLimiterStore, globalSecondLimiterStore } from './stores'
import { determineLimit, determineSkip, handleRateLimitExceeded } from './utils'

const defaultRateLimitOptions: Partial<Options> = {
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  skip: determineSkip,
  handler: handleRateLimitExceeded,
  passOnStoreError: true
}

export const globalMinuteRateLimiter = rateLimit({
  ...defaultRateLimitOptions,
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: determineLimit(1000),
  store: globalMinuteLimiterStore
})

export const globalSecondRateLimiter = rateLimit({
  ...defaultRateLimitOptions,
  windowMs: 1 * 1000, // 1 second
  limit: determineLimit(100),
  store: globalSecondLimiterStore
})

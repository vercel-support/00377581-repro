import { rateLimit, Options } from 'express-rate-limit'
import {
  globalMinuteLimiterStore,
  globalSecondLimiterStore,
  organizationAppLimiterStore
} from './stores'
import { determineOrganizationAppPlanLimit, determineSkip, handleRateLimitExceeded } from './utils'

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
  limit: 1000,
  store: globalMinuteLimiterStore
})

export const globalSecondRateLimiter = rateLimit({
  ...defaultRateLimitOptions,
  windowMs: 1 * 1000, // 1 second
  limit: 100,
  store: globalSecondLimiterStore
})

export const organizationAppRateLimiter = rateLimit({
  ...defaultRateLimitOptions,
  windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
  limit: determineOrganizationAppPlanLimit,
  skipFailedRequests: true,
  keyGenerator: (req) => `${req.team.team}:${req.appId}`,
  store: organizationAppLimiterStore
})

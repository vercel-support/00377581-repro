import { slowDown, Options } from 'express-slow-down'
import { globalSpeedLimiterStore } from './stores'
import { determineSkip } from './utils'

const defaultSpeedLimitOptions: Partial<Options> = {
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  delayMs: (hits) => hits * 200,
  skip: determineSkip,
  passOnStoreError: true
}

export const globalSpeedLimiter = slowDown({
  ...defaultSpeedLimitOptions,
  windowMs: 1 * 60 * 1000, // 1 minute
  delayAfter: 500,
  store: globalSpeedLimiterStore
})

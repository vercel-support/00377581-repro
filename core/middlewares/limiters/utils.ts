import { RateLimitExceededEventHandler, ValueDeterminingMiddleware } from 'express-rate-limit'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const pluralize = (value: number, unit: string): string => {
  return `${value} ${unit}${value !== 1 ? 's' : ''}`
}

const skipList = ['127.0.0.1']

export const determineSkip: ValueDeterminingMiddleware<boolean> = (req) => {
  console.log('req.ip', req.ip)
  console.log('req.ips', req.ips)
  console.log('x-forwarded-for', req.headers['x-forwarded-for'])
  console.log('x-real-ip', req.headers['x-real-ip'])
  const ip = req.ip || '127.0.0.1'
  return skipList.includes(ip)
}

export const handleRateLimitExceeded: RateLimitExceededEventHandler = (req, res, _, opts) => {
  const windowSeconds = opts.windowMs / 1000
  const windowMinutes = windowSeconds / 60
  const windowHours = windowMinutes / 60
  const windowDays = windowHours / 24

  let lastWindowText: string

  if (windowDays >= 1) {
    lastWindowText = pluralize(windowDays, 'day')
  } else if (windowMinutes >= 1) {
    lastWindowText = pluralize(windowMinutes, 'minute')
  } else {
    lastWindowText = pluralize(windowSeconds, 'second')
  }

  return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
    message: ReasonPhrases.TOO_MANY_REQUESTS,
    help: `Rate limit exceeded, wait or upgrade. You have used ${req.rateLimit?.used} out of a maximum of ${req.rateLimit?.limit} requests in the last ${lastWindowText}.`
  })
}

export const determineOrganizationAppPlanLimit: ValueDeterminingMiddleware<number> = (req) => {
  switch (req.plan) {
    case 'free':
      return req.plan.free.max_requests

    case 'pro':
      return req.plan.pro.max_requests

    case 'power':
      return req.plan.power.max_requests

    default:
      return 0
  }
}

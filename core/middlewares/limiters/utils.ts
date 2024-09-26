import { Request } from 'express'
import { RateLimitExceededEventHandler, ValueDeterminingMiddleware } from 'express-rate-limit'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const allowList: string[] = ['127.0.0.1']
const blockList: string[] = []
const ignorePathList: string[] = ['/keep_hot', '/schema']

export const getIp = (req: Request) => {
  // Only trust the X-Real-IP and X-Forwarded-For headers if they are set by a trusted proxy
  // As we are currently using Vercel, we can trust the forwarded headers
  // req.ip is using the first entry in the X-Forwarded-For header when trust proxy is enabled
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip || '127.0.0.1'
  return Array.isArray(ip) ? ip[0] : ip
}

export const determineSkip: ValueDeterminingMiddleware<boolean> = (req) => {
  if (ignorePathList.includes(req.path)) return true
  if (req.method === 'OPTIONS') return true

  const ip = getIp(req)
  return allowList.includes(ip)
}

export const determineLimit = (limit: number): ValueDeterminingMiddleware<number> => {
  return (req) => {
    const ip = getIp(req)
    return blockList.includes(ip) ? 0 : limit
  }
}

const pluralize = (value: number, unit: string): string => {
  return `${value} ${unit}${value !== 1 ? 's' : ''}`
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
    help: `Rate limit exceeded, wait or upgrade. You have used ${req.rateLimit?.used} out of a maximum of ${req.rateLimit?.limit} requests in the last ${lastWindowText}.`,
    debugLevel: 'info'
  })
}

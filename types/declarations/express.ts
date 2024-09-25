import { JwtPayload } from 'jsonwebtoken'
import { RateLimitInfo } from 'express-rate-limit'
import { SlowDownInfo } from 'express-slow-down'

declare module 'express-serve-static-core' {
  interface Request {
    teamId?: string
    identityId?: string
    appId?: any
    claims?: any
    fileUrls?: any
    find?: any // TODO: Interferes with find method from Readable in node:stream
    identity?: JwtPayload
    plan?: any
    rateLimit?: RateLimitInfo
    scope?: any
    slowDown?: SlowDownInfo
    sort?: any
    team?: any
    token?: string
    values?: any
  }
}

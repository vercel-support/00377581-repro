import { RedisStore, Options } from 'rate-limit-redis'
import { redisClient } from '../../services/index.js'

const defaultRedisStoreOptions: Options = {
  // @ts-expect-error - We're using a custom redisClient
  sendCommand: (...args: string[]) => redisClient.call(...args)
}

export const globalMinuteLimiterStore = new RedisStore({
  ...defaultRedisStoreOptions,
  prefix: 'rl:global:min:'
})

export const globalSecondLimiterStore = new RedisStore({
  ...defaultRedisStoreOptions,
  prefix: 'rl:global:sec:'
})

export const globalSpeedLimiterStore = new RedisStore({
  ...defaultRedisStoreOptions,
  prefix: 'sl:global:'
})

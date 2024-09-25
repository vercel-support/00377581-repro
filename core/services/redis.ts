import { Redis } from 'ioredis'

let client: Redis

if (!process.env.REDIS_URL) {
  throw new Error('Invalid/Missing environment variable: "REDIS_URL"')
}

if (process.env.NODE_ENV === 'development') {
  const globalWithRedis = global as typeof globalThis & {
    _redisClient?: Redis
  }

  if (!globalWithRedis._redisClient) {
    globalWithRedis._redisClient = new Redis(process.env.REDIS_URL)
  }
  client = globalWithRedis._redisClient
} else {
  client = new Redis(process.env.REDIS_URL)
}

client.on('error', function (err) {
  throw err
})

export default client

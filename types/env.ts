declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL?: string
      UPSTASH_REDIS_REST_TOKEN?: string
      UPSTASH_REDIS_REST_URL?: string
    }
  }
}

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERCEL?: string
      VERCEL_ENV?: string
      VERCEL_URL?: string
      VERCEL_GIT_PROVIDER?: string
      VERCEL_GIT_PREVIOUS_SHA?: string
      VERCEL_GIT_REPO_SLUG?: string
      VERCEL_GIT_REPO_OWNER?: string
      VERCEL_GIT_REPO_ID?: string
      VERCEL_GIT_COMMIT_REF?: string
      VERCEL_GIT_COMMIT_SHA?: string
      VERCEL_GIT_COMMIT_MESSAGE?: string
      VERCEL_GIT_COMMIT_AUTHOR_LOGIN?: string
      VERCEL_GIT_COMMIT_AUTHOR_NAME?: string
      AUTH_CONFIRMATION_URL?: string
      COMPANY_LEGAL_FORM?: string
      GOCARDLESS_KEY?: string
      PORT?: string
      PUSHER_BEAMS_KEY?: string
      PUSHER_BEAMS_INSTANCEID?: string
      PUSHER_CHANNELS_CONNECTION?: string
      REDIS_CONNECTION?: string
      OPENAI_API_KEY?: string
      LOGTAIL_SOURCE_TOKEN?: string
      REALM_KEY?: string
      APP_URL?: string
      AUTH_RECOVERY_URL?: string
      BASE_URL?: string
      CDN_URL?: string
      IDENTIFIER?: string
      LOGIN_URL?: string
      API_VERSION?: string
      BLOB_STORAGE_CONNECTION?: string
      MESSAGEBIRD_KEY?: string
      COMPANY?: string
      CONTACT_EMAIL?: string
      DB_CONNECTION?: string
      CLOUDMERSIVE_KEY?: string
      CLICKSEND_USER?: string
      CLICKSEND_TOKEN?: string
      APALEO_TOKEN?: string
      DEEPL_API_KEY?: string
      EMAIL_CONNECTION?: string
      JWT_SECRET_ACCESS?: string
      JWT_SECRET_REFRESH?: string
    }
  }
}

export {}

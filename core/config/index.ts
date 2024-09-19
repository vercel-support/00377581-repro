export type OktusEnvironment = 'main' | 'staging' | 'dev' | 'local'
export interface OktusEnvironmentConfigOptions {
  COMPANY?: string
  COMPANY_LEGAL_FORM?: string
  CONTACT_EMAIL?: string
  BASE_URL?: string
  APP_URL?: string
  WEB_URL?: string
  CDN_URL?: string
  AUTH_CONFIRMATION_URL?: string
  AUTH_RECOVERY_URL?: string
}
export type OktusEnvironmentConfig = Record<
  OktusEnvironment | 'common',
  OktusEnvironmentConfigOptions
>

export const Environment: OktusEnvironmentConfig = {
  main: {
    BASE_URL: 'https://api.oktus.io',
    APP_URL: 'https://app.oktus.io',
    WEB_URL: 'https://oktus.io',
    AUTH_CONFIRMATION_URL: 'https://app.oktus.io/register/confirm',
    AUTH_RECOVERY_URL: 'https://app.oktus.io/password/recovery'
  },
  staging: {
    BASE_URL: 'https://staging.api.oktus.io',
    APP_URL: 'https://staging.app.oktus.io',
    WEB_URL: 'https://staging.oktus.io',
    AUTH_CONFIRMATION_URL: 'https://staging.app.oktus.io/register/confirm',
    AUTH_RECOVERY_URL: 'https://staging.app.oktus.io/password/recovery'
  },
  dev: {
    BASE_URL: 'https://dev.api.oktus.io',
    APP_URL: 'https://dev.app.oktus.io',
    WEB_URL: 'https://dev.oktus.io',
    AUTH_CONFIRMATION_URL: 'https://dev.app.oktus.io/register/confirm',
    AUTH_RECOVERY_URL: 'https://dev.app.oktus.io/password/recovery'
  },
  local: {
    BASE_URL: 'http://localhost:3000',
    APP_URL: 'http://localhost:3001',
    WEB_URL: 'https://localhost:3002',
    AUTH_CONFIRMATION_URL: 'http://localhost:3001/register/confirm',
    AUTH_RECOVERY_URL: 'http://localhost:3001/password/recovery'
  },
  common: {
    COMPANY: 'Oktus',
    COMPANY_LEGAL_FORM: 'GmbH',
    CONTACT_EMAIL: 'noreply@oktus.io',
    CDN_URL: 'https://docs.oktus.io'
  }
}

const Config = {
  Environment: Environment
} as const

export default Config

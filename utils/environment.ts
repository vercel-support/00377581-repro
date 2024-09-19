import { Environment, OktusEnvironment, OktusEnvironmentConfigOptions } from '../core/config'

export const isOktusEnvironment = (env: string): env is OktusEnvironment => {
  const oktusEnvironments: OktusEnvironment[] = ['dev', 'local', 'main', 'staging']
  return oktusEnvironments.includes(<OktusEnvironment>env)
}

// TODO: Fixing this because process is not defined local. I just catched that with try catch
export const loadEnvVar = (variable: keyof OktusEnvironmentConfigOptions): string => {
  let env = 'local'
  try {
    env = process?.env.VERCEL_GIT_COMMIT_REF || 'local'
  } catch (error) {
    console.log(error)
  }

  if (!isOktusEnvironment(env)) {
    return Environment.common[variable] ?? ''
  }

  try {
    return process.env[variable] || Environment[env][variable] || Environment.common[variable] || ''
  } catch (error) {
    return Environment[env][variable] || Environment.common[variable] || ''
  }
}

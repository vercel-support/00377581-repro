import { app } from '../core'

app.get('/', () => {
  // Access the environment variable
  const envTest = process.env.ENV_TEST
  
  // Return the environment variable value
  return {
    envValue: envTest
  }
})

export default app

import { app } from '../core'
import { ForbiddenError } from '../core/errors'

app.get('/', () => {
  throw new ForbiddenError('You are not allowed to access this resource')
})

export default app

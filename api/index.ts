import { app } from '../core'
import { ForbiddenError } from '../core/errors'

app.get('/', (_, __, next) => {
  try {
    throw new ForbiddenError('You are not allowed to access this resource')
  } catch (error: any) {
    next(error)
  }
})

export default app

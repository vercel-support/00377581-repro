import { app } from '../core'

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello world' })
})

export default app

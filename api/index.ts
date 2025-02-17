import { app } from '../core/index.js'

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello world' })
})

export default app

import { app } from '../core'
import Environment from './_config'

app.get('/', async (_, res) => {
  const env = await Environment.find({})
  res.status(200).json(env)
})

app.get('/working', (_, res) => {
  res.status(200).json({ message: 'Working' })
})

export default app

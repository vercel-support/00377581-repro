import { VercelRequest, VercelResponse } from '@vercel/node'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { loadEnvVar } from '../utils'

const handler = (req: VercelRequest, res: VercelResponse) => {
  const docsUrl = loadEnvVar('WEB_URL') + '/docs/api'

  res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    message: ReasonPhrases.NOT_FOUND,
    info: `Endpoint ${req.url} does not exist. Please check the documentation at ${docsUrl}`
  })
}

export default handler

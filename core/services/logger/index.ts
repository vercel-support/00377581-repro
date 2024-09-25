import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { nanoid } from 'nanoid'

export const httpError = (req: Request, res: Response, options: any) => {
  try {
    const {
      message,
      id = nanoid(),
      debugLevel = 'info',
      createdAt = new Date().toISOString(),
      help = null,
      errors,
      stack,
      code,
      ...rest
    } = options

    // ActivityController.logMessage(req, options);
    const response = {
      message: message || ReasonPhrases[code as number],
      team: req.team?.team,
      details: {
        id,
        debugLevel,
        help,
        timestamp: createdAt,
        errors,
        stack,
        ...rest
      }
    }

    return res.status(code as number).json(response)
  } catch (error) {
    console.log(error)
    // TODO: Catch this error
  }
}

export class ActivityController {
  /**
   * Send message back to request
   * @param {*} req
   * @param {*} res
   * @param {*} code
   * @param {*} options
   */
  static sendMessage(req: Request, res: Response, code: StatusCodes | number, options: any) {
    try {
      const {
        message,
        id = nanoid(),
        debugLevel = 'info',
        createdAt = new Date().toISOString(),
        help = null,
        errors,
        stack,
        team,
        ...rest
      } = options

      // ActivityController.logMessage(req, options);
      const response = {
        message: message || ReasonPhrases[code],
        team: team ?? req.team?.team,
        details: {
          id,
          debugLevel,
          help,
          timestamp: createdAt,
          errors,
          stack,
          ...rest
        }
      }

      return res.status(code).json(response)
    } catch (error) {
      console.log(error)
      // TODO: Catch this error
    }
  }

  /**
   * Log a message to activity collection
   * @param {*} req
   * @param {*} options
   *
   */
  // static async logMessage(req, options) {
  //   try {
  //     options = {
  //       message: options.message,
  //       _id: options._id || nanoid(),
  //       debugLevel: options.debugLevel || 'info',
  //       createdAt: new Date().toISOString(),
  //       help: options.help || null,
  //       resource: options.resource || null,
  //       details: options.details || null,
  //       createdBy: req.claims !== undefined ? req.claims.identity : null,
  //       team: req.team === undefined ? null : req.team.team,
  //       requestNumber: options.requestNumber || -1,
  //       periods: options.periods || -1
  //     }

  //     // Override request details with custom details
  //     if (options.details === null) {
  //       options.details = {
  //         method: req.method,
  //         url: req.originalUrl,
  //         body: req.body
  //       }
  //     }

  //     // Remove password if contains in body
  //     if (req.body.password !== undefined) {
  //       options.details.body.password = 'passwordRemovedBySystem'
  //     }

  //     Activities.model.create(options)
  //   } catch (error) {
  //     Activities.model.create({
  //       message: error.message,
  //       help: error.stack,
  //       details: {
  //         method: req.method,
  //         url: req.originalUrl,
  //         body: req.body
  //       },
  //       debugLevel: 'error'
  //     } as any)
  //   }
  // }
}

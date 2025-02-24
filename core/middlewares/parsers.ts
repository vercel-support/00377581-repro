import { type NextFunction, type Request, type Response } from 'express'

export const ReservedQueryFields = {
  ID: 'id',
  IDS: 'ids',
  TEAMS: 'teams',
  MODE: 'mode',
  PAGE: 'page',
  PAGELIMIT: 'pageLimit'
} as const

export const parseQueryParams = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.query) {
    res.locals.query = {}
  }

  for (const key in req.query) {
    parseQueryParamsIntoType(req, res, key)
  }

  next()
}

export const parseQueryParamsIntoType = (req: Request, res: Response, key: string): void => {
  // Reserved fields
  if (key === ReservedQueryFields.PAGE) {
    res.locals.query.page = parseInt(String(req.query.page))
    return
  }

  if (key === ReservedQueryFields.PAGELIMIT) {
    res.locals.query.pageLimit = parseInt(String(req.query.pageLimit))
    return
  }

  const target = req.query[key]

  switch (typeof target) {
    case 'string': {
      if (target === '') {
        res.locals.query[key] = ''
      } else if (target === 'null') {
        res.locals.query[key] = null
      } else if (target === 'undefined') {
        res.locals.query[key] = undefined
      } else if (target === 'true' || target === 'false') {
        res.locals.query[key] = target === 'true' ? true : false
      }
      // else if (options.parseNumber && !isNaN(Number(target))) {
      //   return Number(target)
      // }
      else {
        res.locals.query[key] = target
      }

      return
    }

    // case 'object':
    //   if (Array.isArray(target)) {
    //     return target.map((x) => parse(x, options))
    //   } else {
    //     const obj = target
    //     Object.keys(obj).map((key) => (obj[key] = parse(target[key], options)))
    //     return obj
    //   }

    default:
      res.locals.query[key] = target
  }
}

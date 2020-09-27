import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

import TokenPayload from './auth.interface'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided ' })
  }

  const [, token] = authorization.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    const { id } = decoded as TokenPayload
    req.userId = id

    return next()
  } catch {
    return res.status(401).json({ error: 'Token not invalid ' })
  }
}

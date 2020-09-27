import { Request, Response } from 'express'
import brycpt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

import User from '../models/User'
import { getRepository } from 'typeorm'

import authConfig from '../../config/auth'

class SessionController {
  async authenticate(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
      })
      const repository = getRepository(User)

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { email, password } = req.body

      const user = await repository.findOne({
        where: { email }
      })

      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }

      if (!brycpt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Password does not match ' })
      }

      const { id, name } = user

      return res.json({
        user: {
          id,
          name,
          email
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    } catch (err) {
      console.log('err => ', err)
    }
  }
}

export default new SessionController()

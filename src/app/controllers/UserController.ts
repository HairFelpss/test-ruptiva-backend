import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'

import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8)
      })
      const userRepository = getRepository(User)

      if (!(await schema.isValid(req.body))) {
        return res.status(409).json({ error: 'Validation fails' })
      }

      const userExists = await userRepository.findOne({
        where: { email: req.body.email }
      })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const user = await userRepository.create(req.body)
      await userRepository.save(user)

      return res.json(user)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User)

      const user = await userRepository.find({
        select: ['id', 'name', 'email']
      })
      return res.json(user)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string(),
        password: Yup.string()
          .min(8)
          .when('oldPassword', (oldPassword: string, field: any) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when(
          'password',
          (password: string, field: any) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
        )
      })
      const userRepository = getRepository(User)

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      }

      const { email, oldPassword } = req.body
      const id = req.userId

      const user = await userRepository.findOne({ where: { id } })

      if (email && email !== user?.email) {
        const userExists = await userRepository.findOne({
          where: { email: req.body.email }
        })

        if (userExists) {
          return res.status(400).json({ error: 'User already exists' })
        }
      }

      if (oldPassword && !(await user?.checkPassword(oldPassword))) {
        res.status(401).json({ error: 'Password does not match ' })
      }

      delete req.body['oldPassword']
      delete req.body['confirmPassword']

      await userRepository.update(id, req.body)

      const updatedUser = await userRepository.findOne({ id: req.userId })

      return res.json(updatedUser)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userRepository = getRepository(User)

      const { id } = req.params

      const deleteUser = await userRepository.delete(id)

      res.json(deleteUser)
    } catch (err) {
      console.log('err => ', err)

      res.json(err)
    }
  }
}

export default new UserController()

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Fight from '../models/Fight'

class FightController {
  async store(req: Request, res: Response) {
    try {
      const FightRepository = getRepository(Fight)

      const fighter = await FightRepository.create(req.body)
      await FightRepository.save(fighter)

      return res.json(fighter)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req: Request, res: Response) {
    try {
      const FightRepository = getRepository(Fight)

      const user = await FightRepository.find({
        relations: ['event']
      })
      return res.json(user)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const FightRepository = getRepository(Fight)

      const { id } = req.params

      await FightRepository.update(id, req.body)

      const updatedUser = await FightRepository.findOne({ id })

      return res.json(updatedUser)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const FightRepository = getRepository(Fight)

      const { id } = req.params

      const deleteUser = await FightRepository.delete(id)

      res.json(deleteUser)
    } catch (err) {
      console.log('err => ', err)
      res.json(err)
    }
  }
}

export default new FightController()

import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Fight from '../models/Fight'

import FightEvent from '../models/FightEvent'

class FightEventController {
  async store(req: Request, res: Response) {
    try {
      const FightEventRepository = getRepository(FightEvent)
      console.log(req.body)
      const fighter = await FightEventRepository.create(req.body)
      await FightEventRepository.save(fighter)

      return res.json(fighter)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req: Request, res: Response) {
    try {
      const FightEventRepository = getRepository(FightEvent)

      const user = await FightEventRepository.find({
        join: { alias: 'fights', innerJoin: { fight: 'fights' } }
      })
      return res.json(user)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const FightEventRepository = getRepository(FightEvent)

      const { id } = req.params

      await FightEventRepository.update(id, req.body)

      const updatedUser = await FightEventRepository.findOne({ id })

      return res.json(updatedUser)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const FightEventRepository = getRepository(FightEvent)

      const { id } = req.params

      const deleteUser = await FightEventRepository.delete(id)

      res.json(deleteUser)
    } catch (err) {
      console.log('err => ', err)
      res.json(err)
    }
  }
}

export default new FightEventController()

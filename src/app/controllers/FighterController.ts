import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Fighter from '../models/Fighter'

class FighterController {
  async store(req: Request, res: Response) {
    try {
      const FighterRepository = getRepository(Fighter)

      const fighter = await FighterRepository.create(req.body)
      await FighterRepository.save(fighter)

      return res.json(fighter)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async index(req: Request, res: Response) {
    try {
      const FighterRepository = getRepository(Fighter)

      const user = await FighterRepository.find({
        relations: ['fight']
      })
      return res.json(user)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const FighterRepository = getRepository(Fighter)

      const { id } = req.params

      await FighterRepository.update(id, req.body)

      const updatedUser = await FighterRepository.findOne({ id })

      return res.json(updatedUser)
    } catch (err) {
      console.log('err => ', err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const FighterRepository = getRepository(Fighter)

      const { id } = req.params

      const deleteUser = await FighterRepository.delete(id)

      res.json(deleteUser)
    } catch (err) {
      console.log('err => ', err)

      res.json(err)
    }
  }
}

export default new FighterController()

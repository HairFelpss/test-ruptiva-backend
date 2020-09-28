import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FightController from './app/controllers/FightController'
import FightEventController from './app/controllers/FightEventController'
import FighterController from './app/controllers/FighterController'

import authMiddleware from './app/middlewares/auth'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.authenticate)

routes.get('/users', UserController.index)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.post('/fight', FightController.store)
routes.get('/fight', FightController.index)
routes.put('/fight/:id', FightController.update)
routes.delete('/fight/:id', FightController.delete)

routes.post('/event', FightEventController.store)
routes.get('/event', FightEventController.index)
routes.put('/event/:id', FightEventController.update)
routes.delete('/event/:id', FightEventController.delete)

routes.post('/fighter', FighterController.store)
routes.get('/fighter', FighterController.index)
routes.put('/fighter/:id', FighterController.update)
routes.delete('/fighter/:id', FighterController.delete)

routes.use(authMiddleware)

export default routes

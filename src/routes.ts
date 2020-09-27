import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/auth'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.authenticate)

routes.use(authMiddleware)

routes.get('/users', UserController.index)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

/*routes.post('/roles', RoleController.store)
routes.get('/roles', RoleController.index)
routes.put('/roles/:id', RoleController.update)
routes.delete('/roles/:id', RoleController.delete)*/

export default routes

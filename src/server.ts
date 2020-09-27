import 'reflect-metadata'

import express from 'express'
import './database/connect'
import routes from './routes'

const port = 3000

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log(`server started on http://localhost:${port} `)
})

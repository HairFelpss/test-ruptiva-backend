require('dotenv').config()

export default {
  secret: process.env.APP_SECRET || 'default',
  expiresIn: '7d'
}

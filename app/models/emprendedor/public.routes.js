import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/emprendedor/:id([0-9]+)?')
  .get    ((req,res) => controller.GET(req, res))

export default app

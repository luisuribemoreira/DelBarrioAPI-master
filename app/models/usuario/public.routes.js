import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/usuario/:id([0-9]+)?')
  .post   ((req,res) => controller.POST(req, res))

export default app

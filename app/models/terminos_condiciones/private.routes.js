import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/terminos_condiciones')
  .post   ((req,res) => controller.POST(req, res)) // Heredar 206, 207, 208

export default app

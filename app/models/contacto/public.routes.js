import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/contacto/:id([0-9]+)?')
  .get    ((req,res) => controller.GETByPersona(req, res))

export default app

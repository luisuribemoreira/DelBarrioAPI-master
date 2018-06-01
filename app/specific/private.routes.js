import express from 'express'
import clientes from './private/clientes'
import administradores from './private/administradores'

const app = express.Router()

app.route('/clientes')
  .get   ((req,res) => clientes.GET(req, res))

app.route('/administradores')
  .get   ((req,res) => administradores.GET(req, res))

export default app

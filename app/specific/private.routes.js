import express from 'express'
import clientes from './private/clientes'
import administradores from './private/administradores'
import permit from '../middlewares/permission'

const app = express.Router()

app.route('/clientes')
  .get   (permit(209),(req,res) => clientes.GET(req, res))

app.route('/administradores')
  .get   (permit(211),(req,res) => administradores.GET(req, res))

export default app

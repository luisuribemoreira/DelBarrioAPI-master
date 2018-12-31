import controller from './controller'
import express from 'express'
// import permit from '../middlewares/permission'

const app = express.Router()

app.route('/usuario')
//  .get   (permit(101), (req,res) => controller.getUsuario(req, res))
  .get   ((req,res) => controller.getUsuario(req, res))

export default app

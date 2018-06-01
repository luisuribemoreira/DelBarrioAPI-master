import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
import inject from '../../middlewares/injection'
const app = express.Router()

app.route('/calificacion/:id([0-9]+)?')
  .get    (permit(106), (req,res) => controller.GET(req, res))
  .post   (permit(220), inject.IDEN_USUARIO(), (req,res) => controller.POST(req, res))
  .put    (permit(221), (req,res) => controller.PUT(req, res))
  // .delete ((req,res) => controller.DELETE(req, res))

export default app

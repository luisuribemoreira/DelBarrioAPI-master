import controller from './controller'
import express from 'express'
import inject from '../../middlewares/injection'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/denuncia/:id([0-9]+)?')
  .get    (permit(108), (req,res) => controller.GET(req, res))
  .post   (permit(222), inject.IDEN_USUARIO(), (req,res) => controller.POST(req, res))
  .put    (permit(222), (req,res) => controller.PUT(req, res))
  // .delete ((req,res) => controller.DELETE(req, res))

export default app

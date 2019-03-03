import controller from './controller'
import express from 'express'
import inject from '../../middlewares/injection'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/resolucion_denuncia/:id([0-9]+)?')
  .get    (permit(109) ,(req,res) => controller.GET(req, res))
  .post   (permit(223), inject.IDEN_USUARIO(), (req,res) => controller.POST(req, res))
  //.put    ((req,res) => controller.PUT(req, res))
  //.delete ((req,res) => controller.DELETE(req, res))

export default app

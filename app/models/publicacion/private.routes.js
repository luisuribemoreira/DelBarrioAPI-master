import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/publicacion/:id([0-9]+)?')
  .post   (permit(212), (req,res) => controller.POST(req, res))
  .put    (permit(212), (req,res) => controller.PUT(req, res))
  // .delete ((req,res) => controller.DELETE(req, res))

export default app

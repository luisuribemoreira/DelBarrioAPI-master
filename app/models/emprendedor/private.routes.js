import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/emprendedor/:id([0-9]+)?')
  .get    (permit(103), (req,res) => controller.GET(req, res))
  .post   (permit(225), (req,res) => controller.POST(req, res))
  .put    (permit([207,210]), (req,res) => controller.PUT(req, res))
  // .delete ((req,res) => controller.DELETE(req, res))

export default app

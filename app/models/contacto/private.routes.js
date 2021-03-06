import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/contacto/:id([0-9]+)?')
  .get    ((req, res) => controller.GETByPersona(req, res))
  .post   (permit(207),(req,res) => controller.POST(req, res)) // Heredar 206, 207, 208
  .put    (permit(207),(req,res) => controller.PUT(req, res)) // Heredar 206, 207, 208
  .delete (permit(303), (req,res) => controller.DELETE(req, res))

export default app

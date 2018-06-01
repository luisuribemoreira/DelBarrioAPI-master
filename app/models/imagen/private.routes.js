import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'
const app = express.Router()

app.route('/imagen/:id([0-9]+)?')
  .post   (permit(226), (req,res) => controller.POST(req, res))
  .put    (permit(226), (req,res) => controller.PUT(req, res))
  .delete (permit(302), (req,res) => controller.DELETE(req, res))

export default app

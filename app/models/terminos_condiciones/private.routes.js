import controller from './controller'
import express from 'express'
import permit from '../../middlewares/permission'

const app = express.Router()


app.route('/terminos_condiciones')
  .post   (permit(227), (req,res) => controller.POST(req, res))

export default app

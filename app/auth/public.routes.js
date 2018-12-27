import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/auth')
  .post   ((req, res) =>  controller.authenticate(req, res))

app.route('/forgot-pass')
  .post   ((req, res) => controller.forgotPassword(req, res))
app.route('/reset-pass/:token')
  .get   ((req, res) => controller.getResetPassword(req, res))
  app.route('/reset-pass/:token')
  .post   ((req, res) => controller.postResetPassword(req, res))



export default app

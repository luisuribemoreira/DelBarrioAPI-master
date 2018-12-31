import controller from './controller'
import express from 'express'
const app = express.Router()

app.route('/auth')
  .post   ((req, res) =>  controller.authenticate(req, res))

app.route('/forgot-pass')
  .put   ((req, res) => controller.forgotPassword(req, res))
app.route('/reset-pass/:token')
  .get   ((req, res) => controller.GETResetPassword(req, res))
  .put   ((req, res) => controller.PUTResetPassword(req, res))


export default app

import nodemailer from 'nodemailer'
import express from 'express'

const app = express.Router()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'delbarriotest@gmail.com',
    pass: 'delbarrio1234'
  }
})

function send (req, res) {
  transporter.sendMail({
    from: 'delbarriotest@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  }, (errors, info) => {
    if (errors) {
      res.status(500).json({error: true, data: {message: 'Internal error', error: errors}})
    } else {
      res.json({error: false, data: info})
    }
  })
}

app.route('/email')
  .post((req, res) => send(req, res))

export default app
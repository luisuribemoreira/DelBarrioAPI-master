import nodemailer from 'nodemailer'
import express from 'express'
import config from '../config'

const app = express.Router()

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.mail,
    pass: config.mailPsw
  }
})

function send (req, res) {
  transporter.sendMail({
    from: config.mail,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  }, (errors, info) => {
    if (errors) {
      res.status(500).json({error: true, data: {message: 'Internal error', error: errors}})
    } else {
      res.json({error: false, data: info})
    }
  })
}

function sendWithAttachment(options) {
  transporter.sendMail({
    from: 'delbarriotest@gmail.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: [
      {
        filename: options.fileName,
        path: options.path
      }
    ]
  }, (errors, info) => {
    if (errors) {
      console.log(errors)
    } else {
      console.log(info)
    }
  })
}

app.route('/email')
  .post((req, res) => send(req, res))

export default {
  app,
  sendWithAttachment
}

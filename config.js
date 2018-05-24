'use strict'
import knexFile from './knexfile'

let   SECRET
let   SECRET_ENCRYPT
let   API_PORT     
let   API_HOST
let   KNEX_CONFIG
let   MAIL
let   MAIL_NAME
let   MAIL_PSW
let   MAIL_FROM
const env = process.env.NODE_ENV || 'development'

switch (env) {
  case 'production':
    SECRET = process.env.SECRET
    SECRET_ENCRYPT = process.env.SECRET_ENCRYPT

    API_PORT = process.env.API_PORT
    API_HOST = process.env.API_HOST

    KNEX_CONFIG = knexFile.production

    MAIL = process.env.MAIL
    MAIL_NAME = process.env.MAIL_NAME
    MAIL_PSW = process.env.MAIL_PSW
    MAIL_FROM = process.env.MAIL_FROM
    break

  case 'development':
    SECRET = 'claveultrasecreta'
    SECRET_ENCRYPT = 'provWeb'

    API_PORT = '3000'
    API_HOST = 'http://localhost'

    KNEX_CONFIG = knexFile.development

    MAIL = ''
    MAIL_NAME = ''
    MAIL_PSW = ''
    MAIL_FROM = ''
    break
  default:
    break
}

module.exports = {
  secret: SECRET,
  secretEncrypt:SECRET_ENCRYPT,
  apiPort:API_PORT,
  apiHost:API_HOST,
  knexConfig:KNEX_CONFIG,
  mail:MAIL,
  mailName:MAIL_NAME,
  mailPsw:MAIL_PSW,
  mailFrom:MAIL_FROM
}

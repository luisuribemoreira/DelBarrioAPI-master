'use strict'
let   SECRET
let   SECRET_ENCRYPT
let   API_PORT     
let   API_HOST
let   POSTGRES_HOST
let   POSTGRES_DB
let   POSTGRES_PORT
let   POSTGRES_USER
let   POSTGRES_PASSWORD
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

    POSTGRES_HOST = process.env.POSTGRES_HOST
    POSTGRES_DB = process.env.POSTGRES_DB
    POSTGRES_PORT = process.env.POSTGRES_PORT
    POSTGRES_USER = process.env.POSTGRES_USER
    POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD

    MAIL = process.env.MAIL
    MAIL_NAME = process.env.MAIL_NAME
    MAIL_PSW = process.env.MAIL_PSW
    MAIL_FROM = process.env.MAIL_FROM
    break

  case 'development':
    SECRET = 'claveultrasecreta'
    SECRET_ENCRYPT = 'provWeb'

    API_PORT = '3001'
    API_HOST = 'http://localhost'

    POSTGRES_HOST = 'localhost'
    POSTGRES_DB = 'delbarrio'
    POSTGRES_PORT = '5432'
    POSTGRES_USER = 'root'
    POSTGRES_PASSWORD = '1234'

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
  postgresHost:POSTGRES_HOST,
  postgresDb:POSTGRES_DB,
  postgresPort:POSTGRES_PORT,
  postgresUser:POSTGRES_USER,
  postgresPwd:POSTGRES_PASSWORD,
  mail:MAIL,
  mailName:MAIL_NAME,
  mailPsw:MAIL_PSW,
  mailFrom:MAIL_FROM
}

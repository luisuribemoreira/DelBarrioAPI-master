import jwt from 'jsonwebtoken'
import strategie from '../middlewares/jwt-strategie'
import { comparePass, filter } from './_helpers'
import { Model } from '../models/usuario/model'
import moment from 'moment'
import crypto from 'crypto'

/**
 * Autenticar a un usuario.
 * @param {string} req.body.email - Correo electrónico del usuario a autenticar.
 * @param {string} req.body.password - Contraseña del usuario a autenticar.
 * @return {json} Token JWT. En caso fallido, mensaje de error.
 */
function authenticate (req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email
    var password = req.body.password
    new Model({EMAIL_USUARIO: email}).fetch({withRelated: ['rol', 'rol.permisos', 'persona', 'emprendedor']})
      .then(user => {
        if (user) {
          if(comparePass(password, user.attributes.DESC_PASSWORD)) {
            if(user.attributes.FLAG_VIGENTE) {
              if(!user.attributes.FLAG_BAN) {
                var payload = filter.tokenPayload(user.toJSON({ omitPivot: true }))
                var token = jwt.sign(payload, strategie.jwtOptions.secretOrKey)
                res.json({error: false, data: {token: token}})
              } else {
                res.status(401).json({error: true, data: {message: 'Cuenta baneada'}})
              }
            } else {
              res.status(401).json({error: true, data: {message: 'Cuenta deshabilitada'}})
            }
          } else {
            res.status(401).json({error: true, data: {message: 'Contraseña incorrecta'}})
          }
        } else {
          res.status(404).json({error: true, data: {message: 'Usuario no encontrado'}})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    res.status(401).json({error: true, data: {message: `email: ${email} password: ${password}`}})
  }
}

function getUsuario (req, res) {
  new Model({IDEN_USUARIO: req.user.IDEN_USUARIO}).fetch({ withRelated: ['rol', 'telefonos', 'persona', 'emprendedor'] })
    .then(user => {      
      res.json({ error: false, data: filter.getUsuario(user.toJSON()) })
    })
}

function forgotPassword (req, res) {
  if (req.body.email) {
    var email = req.body.email
    new Model({EMAIL_USUARIO: email})
      .fetch({require: true})
      .then(user => {
        if (user) {
          if(user.attributes.FLAG_VIGENTE) {
            if(!user.attributes.FLAG_BAN) {
              let dateObj = new Date()
              let date = moment(dateObj).add(1, 'hours')
              let token = crypto.randomBytes(48).toString('hex')
              user.save({
                RESET_PASSWORD_TOKEN : token,
                RESET_PASSWORD_EXPIRES: date
              })
              .then(() => {
                res.json({error: false, data: {message: 'Entity successfully updated', tokenAux: token}})
              }).catch(err => {
                res.status(500).json({error: true, data: {message: 'Internal error'}})
                throw err
              })
              } else {
                res.status(401).json({error: true, data: {message: 'Cuenta baneada'}})
              }
          } else {
              res.status(401).json({error: true, data: {message: 'Cuenta deshabilitada'}})
          }
        } else {
          res.status(404).json({error: true, data: {message: 'Correo no encontrado'}})
        }
        }).catch(Model.NotFoundError, () => {
        res.status(404).json({error: true, data: {message: 'Correo no encontrado'}})
        }).catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
  } else {
    res.status(401).json({error: true, data: {message: `email: ${email}`}})
  }
}

function getResetPassword (req, res) {
  var tokenAux = req.params.token
  console.log(req.params)
  //console.log(tokenAux)
  new Model({RESET_PASSWORD_TOKEN: tokenAux})
  .fetch({withRelated: ['persona']})
  .then((user) => {
    if (user) {
      let dateAux = new Date(user.attributes.RESET_PASSWORD_EXPIRES)
      if (dateAux >= Date.now()) {
        res.json({error: false, data: {message: 'Entity founded'}})
      } else {
        res.status(401).json({error: true, data: {message: 'Token expirado, vuelva a enviar la solicitud'}})
      }
    }  else {
      res.status(404).json({error: true, data: {message: 'Usuario no encontrado'}})
    }
  }).catch(Model.NotFoundError, () => {
    res.status(404).json({error: true, data: {message: 'Correo no encontrado'}})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

function postResetPassword (req, res) {
  let token = req.params.token
  new Model({RESET_PASSWORD_TOKEN: token})
  .fetch({withRelated: ['persona']})
  .then((user) => {
    if (user) {
      let dateAux = new Date(user.attributes.RESET_PASSWORD_EXPIRES)
      if (dateAux >= Date.now()) {
        user.save({
          DESC_PASSWORD : req.body.password,
          RESET_PASSWORD_TOKEN : null,
          RESET_PASSWORD_EXPIRES: null
        })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        }).catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error 1'}})
          throw err
        })
      } else {
        res.status(401).json({error: true, data: {message: 'Token expirado, vuelva a enviar la solicitud'}})
      }
    }  else {
      res.status(404).json({error: true, data: {message: 'Usuario no encontrado'}})
    }
  }).catch(Model.NotFoundError, () => {
    res.status(404).json({error: true, data: {message: 'Correo no encontrado'}})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error 2'}})
      throw err
    })
}

/* Se exporta el método */
module.exports = {
  authenticate,
  getUsuario,
  forgotPassword,
  getResetPassword,
  postResetPassword
}

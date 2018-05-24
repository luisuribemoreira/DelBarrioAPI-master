import jwt from 'jsonwebtoken'
import strategie from '../middlewares/jwt-strategie'
import { comparePass, filter } from './_helpers'
import { Model } from '../models/usuario/model'

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

/* Se exporta el método */
module.exports = {
  authenticate,
  getUsuario
}

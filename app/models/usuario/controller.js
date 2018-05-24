import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener usuarios.
 * @param {integer} req.params.id - ID de usuario (opcional).
 * @return {json} Usuario(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_USUARIO: id}).fetch({withRelated: ['telefonos']})
      .then(entity => {
        if(!entity) {
          res.status(404).json({error: true, data: {message: 'Entity not found'}})
        } else {
          res.json({error: false, data: entity.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new Collection().fetch({withRelated: ['telefonos']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nuevo usuario.
 * @param {integer} req.body.IDEN_ROL - ID de Rol del usuario.
 * @param {string} req.body.EMAIL_USUARIO - Correo electrónico del usuario.
 * @param {string} req.body.DESC_PASSWORD - Contraseña del usuario (en texto plano).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el usuario está activo (opcional, por defecto true).
 * @param {boolean} req.body.FLAG_BAN - Define si el usuario está baneado (opcional, por defecto false).
 * @return {json} Usuario. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_ROL:       req.body.IDEN_ROL,
    EMAIL_USUARIO:  req.body.EMAIL_USUARIO,
    DESC_PASSWORD:  req.body.DESC_PASSWORD,
    FLAG_VIGENTE:   req.body.FLAG_VIGENTE,
    FLAG_BAN:       req.body.FLAG_BAN
  }).save()
    .then(entity => {
      res.json({error: false, data: entity.toJSON()})
    }).catch(Checkit.Error, err => {
      res.status(400).json({error: true, data: err})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Actualiza un usuario.
 * @param {integer} req.params.id - ID del usuario.
 * @param {string} req.body.EMAIL_USUARIO - Correo electrónico del usuario (opcional).
 * @param {string} req.body.DESC_PASSWORD - Contraseña del usuario (opcional, en texto plano).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el usuario está activo (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si el usuario está baneado (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_USUARIO: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        EMAIL_USUARIO:  (typeof req.body.EMAIL_USUARIO === 'undefined') ? entity.get('EMAIL_USUARIO') : req.body.EMAIL_USUARIO,
        DESC_PASSWORD:  (typeof req.body.DESC_PASSWORD === 'undefined') ? entity.get('DESC_PASSWORD') : req.body.DESC_PASSWORD,
        FLAG_VIGENTE:   (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
        FLAG_BAN:       (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN
      })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        }).catch(Checkit.Error, err => {
          res.status(400).json({error: true, data: err})
        }).catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    }).catch(Model.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Entity not found'}})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
} 

/**
 * Elimina un usuario.
 * @param {integer} req.params.id - ID del usuario.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_USUARIO: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Entity successfully deleted'}})
    })
    .catch(Model.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Entity not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}

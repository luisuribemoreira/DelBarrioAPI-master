import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener personas.
 * @param {integer} req.params.id - ID de persona (opcional).
 * @return {json} Persona(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_PERSONA: id}).fetch({withRelated: ['usuario']})
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
    new Collection().fetch({withRelated: ['usuario']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva persona.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario al que corresponde esta persona.
 * @param {string} req.body.NOMBRES - Nombres de la persona.
 * @param {string} req.body.APELLIDO_PATERNO - Apellido paterno de la persona.
 * @param {string} req.body.APELLIDO_MATERNO - Apellido materno de la persona.
 * @param {date} req.body.FECH_FECHA_NACIMIENTO - Fecha de nacimiento de la persona.
 * @return {json} Persona. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_USUARIO:           req.body.IDEN_USUARIO,
    NOMBRES:                req.body.NOMBRES,
    APELLIDO_PATERNO:       req.body.APELLIDO_PATERNO,
    APELLIDO_MATERNO:       req.body.APELLIDO_MATERNO,
    FECH_FECHA_NACIMIENTO:  req.body.FECH_FECHA_NACIMIENTO
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
 * Actualiza una persona.
 * @param {integer} req.params.id - ID de la persona.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario al que corresponde esta persona (opcional).
 * @param {string} req.body.NOMBRES - Nombres de la persona (opcional).
 * @param {string} req.body.APELLIDO_PATERNO - Apellido paterno de la persona (opcional).
 * @param {string} req.body.APELLIDO_MATERNO - Apellido materno de la persona (opcional).
 * @param {date} req.body.FECH_FECHA_NACIMIENTO - Fecha de nacimiento de la persona (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_PERSONA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_USUARIO:           (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        NOMBRES:                (typeof req.body.NOMBRES === 'undefined') ? entity.get('NOMBRES') : req.body.NOMBRES,
        APELLIDO_PATERNO:       (typeof req.body.APELLIDO_PATERNO === 'undefined') ? entity.get('APELLIDO_PATERNO') : req.body.APELLIDO_PATERNO,
        APELLIDO_MATERNO:       (typeof req.body.APELLIDO_MATERNO === 'undefined') ? entity.get('APELLIDO_MATERNO') : req.body.APELLIDO_MATERNO,
        FECH_FECHA_NACIMIENTO:  (typeof req.body.FECH_FECHA_NACIMIENTO === 'undefined') ? entity.get('FECH_FECHA_NACIMIENTO') : req.body.FECH_FECHA_NACIMIENTO
      })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        })
        .catch(Checkit.Error, err => {
          res.status(400).json({error: true, data: err})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(Model.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Entity not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Elimina una persona.
 * @param {integer} req.params.id - ID de la persona.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_PERSONA: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener deshabilitaciones de cuentas.
 * @param {integer} req.params.id - ID de deshabilitación de cuenta (opcional).
 * @return {json} Deshabilitación(es) de cuentas. En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_DESHABILITACION_CUENTA: id}).fetch()
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
    new Collection().fetch()
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva deshabilitación de cuenta.
 * @param {integer} req.body.IDEN_USUARIO - ID del usuario a deshabilitar
 * @param {integer} req.body.IDEN_MOTIVO_DESHABILITACION - ID del motivo de deshabilitación
 * @param {string} req.body.DESC_COMENTARIO - Descripción de la deshabilitación.
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la deshabilitación (opcional, por defecto now())
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la deshabilitación de cuenta está activa (opcional, por defecto true).
 * @return {json} Deshabilitación de cuenta. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_USUARIO:                 req.body.IDEN_USUARIO,
    IDEN_MOTIVO_DESHABILITACION:  req.body.IDEN_MOTIVO_DESHABILITACION,
    DESC_COMENTARIO:              req.body.DESC_COMENTARIO,
    FECH_CREACION:                req.body.FECH_CREACION,
    FLAG_VIGENTE:                 req.body.FLAG_VIGENTE
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
 * Actualiza una deshabilitación de cuenta.
 * @param {integer} req.params.id - ID de la deshabilitación de cuenta.
 * @param {integer} req.body.IDEN_MOTIVO_DESHABILITACION - ID del motivo de deshabilitación (opcional).
 * @param {string} req.body.DESC_COMENTARIO - Descripción de la deshabilitación. (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la deshabilitación de cuenta está activa (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la deshabilitación (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_DESHABILITACION_CUENTA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_MOTIVO_DESHABILITACION:  (typeof req.body.IDEN_MOTIVO_DESHABILITACION === 'undefined') ? entity.get('IDEN_MOTIVO_DESHABILITACION') : req.body.IDEN_MOTIVO_DESHABILITACION,
        DESC_COMENTARIO:              (typeof req.body.DESC_COMENTARIO === 'undefined') ? entity.get('DESC_COMENTARIO') : req.body.DESC_COMENTARIO,
        FLAG_VIGENTE:                 (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
        FECH_CREACION:                (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
      })
        .then(() => {
          res.json({error: false, data: {message: 'Entity successfully updated'}})
        }).catch(Checkit.Error, err => {
          res.status(400).json({error: true, data: err})
        }).catch(err => {
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
 * Elimina una deshabilitación de cuenta.
 * @param {integer} req.params.id - ID de la deshabilitación de cuenta.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_DESHABILITACION_CUENTA: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'
import { filter } from './_helpers'

/**
 * Obtener motivos de deshabilitación.
 * @param {integer} req.params.id - ID de motivo de deshabilitación (opcional).
 * @return {json} Motivo(s) de deshabilitación. En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_MOTIVO_DESHABILITACION: id}).fetch()
      .then(entity => {
        if(!entity) {
          res.status(404).json({error: true, data: {message: 'Entity not found'}})
        } else {
          res.json({error: false, data: filter.GETsingle(entity)})
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
 * Agregar nuevo motivo de deshabilitación.
 * @param {string} req.body.NOMB_MOTIVO_DESHABILITACION - Nombre descriptivo del motivo de deshabilitación.
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el motivo de deshabilitación está activo (opcional, por defecto true).
 * @return {json} Motivo de deshabilitación. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_MOTIVO_DESHABILITACION:  req.body.NOMB_MOTIVO_DESHABILITACION,
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
 * Actualiza un motivo de deshabilitación.
 * @param {integer} req.params.id - ID del motivo de deshabilitación.
 * @param {string} req.body.NOMB_MOTIVO_DESHABILITACION - Nombre descriptivo del motivo de deshabilitación (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el motivo de deshabilitación está activo (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_MOTIVO_DESHABILITACION: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_MOTIVO_DESHABILITACION:  (typeof req.body.NOMB_MOTIVO_DESHABILITACION === 'undefined') ? entity.get('NOMB_MOTIVO_DESHABILITACION') : req.body.NOMB_MOTIVO_DESHABILITACION,
        FLAG_VIGENTE:                 (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
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
 * Elimina un motivo de deshabilitación.
 * @param {integer} req.params.id - ID del motivo de deshabilitación.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_MOTIVO_DESHABILITACION: req.params.id})
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

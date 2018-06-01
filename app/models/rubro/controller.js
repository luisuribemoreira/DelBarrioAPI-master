import { Model, Collection } from './model'
import Checkit from 'checkit'
import { filter } from './_helpers'
/**
 * Obtener rubros.
 * @param {integer} req.params.id - ID de rubro (opcional).
 * @return {json} Rubro(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_RUBRO: id}).fetch()
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
 * Agregar nuevo rubro.
 * @param {string} req.body.NOMB_RUBRO - Nombre del rubro.
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el rubro está activo (opcional, por defecto true).
 * @return {json} Rubro. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_RUBRO:   req.body.NOMB_RUBRO,
    FLAG_VIGENTE: req.body.FLAG_VIGENTE
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
 * Actualiza un rubro.
 * @param {integer} req.params.id - ID del rubro.
 * @param {string} req.body.NOMB_RUBRO - Nombre del rubro (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si el rubro está activo (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_RUBRO: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_RUBRO:   (typeof req.body.NOMB_RUBRO === 'undefined') ? entity.get('NOMB_RUBRO') : req.body.NOMB_RUBRO,
        FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
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
 * Elimina un rubro.
 * @param {integer} req.params.id - ID del rubro.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_RUBRO: req.params.id})
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

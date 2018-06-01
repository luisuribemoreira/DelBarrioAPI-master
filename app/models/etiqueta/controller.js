import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener etiquetas.
 * @param {integer} req.params.id - ID de etiqueta (opcional).
 * @return {json} Etiqueta(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_ETIQUETA: id}).fetch()
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
 * Agregar nueva etiqueta.
 * @param {string} req.body.NOMB_ETIQUETA - Nombre de la etiqueta.
 * @return {json} Etiqueta. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_ETIQUETA: req.body.NOMB_ETIQUETA
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
 * Actualiza una etiqueta.
 * @param {integer} req.params.id - ID de la etiqueta.
 * @param {string} req.body.NOMB_ETIQUETA - Nombre de la etiqueta (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_ETIQUETA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_ETIQUETA: (typeof req.body.NOMB_ETIQUETA === 'undefined') ? entity.get('NOMB_ETIQUETA') : req.body.NOMB_ETIQUETA,
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
 * Elimina una etiqueta.
 * @param {integer} req.params.id - ID de la etiqueta.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_ETIQUETA: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener teléfonos.
 * @param {integer} req.params.id - ID de teléfono (opcional).
 * @return {json} Teléfono(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_FONO: id}).fetch({withRelated: ['usuario']})
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
 * Agregar nuevo teléfono.
 * @param {integer} req.body.CODI_FONO - Código estandarizado de fono, el cual define si es fijo o móvil.
 * @param {string} req.body.NUMR_FONO - Número de teléfono.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario dueño del teléfono.
 * @return {json} Teléfono. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    CODI_FONO:    req.body.CODI_FONO,
    NUMR_FONO:    req.body.NUMR_FONO,
    IDEN_USUARIO: req.body.IDEN_USUARIO
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
 * Actualiza un teléfono.
 * @param {integer} req.params.id - ID de teléfono.
 * @param {integer} req.body.CODI_FONO - Código estandarizado de fono, el cual define si es fijo o móvil (opcional).
 * @param {string} req.body.NUMR_FONO - Número de teléfono (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario dueño del teléfono (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_FONO: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        CODI_FONO:    (typeof req.body.CODI_FONO === 'undefined') ? entity.get('CODI_FONO') : req.body.CODI_FONO,
        NUMR_FONO:    (typeof req.body.NUMR_FONO === 'undefined') ? entity.get('NUMR_FONO') : req.body.NUMR_FONO,
        IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO
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
 * Elimina un teléfono.
 * @param {integer} req.params.id - ID de teléfono.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_FONO: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'
import { filter } from './_helpers'

/**
 * Obtener FAQs.
 * @param {integer} req.params.id - ID de FAQ (opcional).
 * @return {json} FAQ(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_FAQ: id}).fetch()
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
 * Agregar nueva FAQ.
 * @param {string} req.body.NOMB_FAQ - Título de FAQ.
 * @param {string} req.body.DESC_FAQ - Descripción de FAQ.
 * @return {json} FAQ. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_FAQ: req.body.NOMB_FAQ,
    DESC_FAQ: req.body.DESC_FAQ
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
 * Actualiza una FAQ.
 * @param {integer} req.params.id - ID de FAQ.
 * @param {string} req.body.NOMB_FAQ - Título de FAQ (opcional).
 * @param {string} req.body.DESC_FAQ - Descripción de FAQ (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_FAQ: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_FAQ: (typeof req.body.NOMB_FAQ === 'undefined') ? entity.get('NOMB_FAQ') : req.body.NOMB_FAQ,
        DESC_FAQ: (typeof req.body.DESC_FAQ === 'undefined') ? entity.get('DESC_FAQ') : req.body.DESC_FAQ
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
 * Elimina una FAQ.
 * @param {integer} req.params.id - ID de FAQ.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_FAQ: req.params.id})
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

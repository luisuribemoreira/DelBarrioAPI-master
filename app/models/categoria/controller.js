import { Model, Collection } from './model'
import Checkit from 'checkit'
import { filter } from './_helpers'

/**
 * Obtener categorías.
 * @param {integer} req.params.id - ID de categoría (opcional).
 * @return {json} Categoría(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_CATEGORIA: id}).fetch({withRelated: ['subcategorias']})
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
    new Collection().query(query => { query
      .where('IDEN_CATEGORIA_PADRE', null)
      .orderBy('IDEN_CATEGORIA', 'asc')
    })
      .fetch({withRelated: ['subcategorias']})
      .then(entities => {
        res.json({error: false, data: filter.GETall(entities)})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría.
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Categoría. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    NOMB_CATEGORIA:       req.body.NOMB_CATEGORIA,
    IDEN_CATEGORIA_PADRE: req.body.IDEN_CATEGORIA_PADRE,
    FLAG_VIGENTE:         req.body.FLAG_VIGENTE
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
 * Actualiza una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría (opcional).
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_CATEGORIA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        NOMB_CATEGORIA:       (typeof req.body.NOMB_CATEGORIA === 'undefined') ? entity.get('NOMB_CATEGORIA') : req.body.NOMB_CATEGORIA,
        IDEN_CATEGORIA_PADRE: (typeof req.body.IDEN_CATEGORIA_PADRE === 'undefined') ? entity.get('IDEN_CATEGORIA_PADRE') : req.body.IDEN_CATEGORIA_PADRE,
        FLAG_VIGENTE:         (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
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
 * Elimina una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_CATEGORIA: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener roles.
 * @param {integer} req.params.id - ID de rol (opcional).
 * @return {json} Rol(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_ROL: id}).fetch({withRelated: ['permisos']})
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
    new Collection().fetch({withRelated: ['permisos']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nuevo rol.
 * @param {integer} req.body.CODI_ROL - Código único estandarizado del rol.
 * @param {string} req.body.NOMB_ROL - Nombre del rol.
 * @return {json} Rol. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    CODI_ROL: req.body.CODI_ROL,
    NOMB_ROL: req.body.NOMB_ROL
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
 * Actualiza un rol.
 * @param {integer} req.params.id - ID de rol.
 * @param {integer} req.body.CODI_ROL - Código único estandarizado del rol (opcional).
 * @param {string} req.body.NOMB_ROL - Nombre del rol (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_ROL: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        CODI_ROL: (typeof req.body.CODI_ROL === 'undefined') ? entity.get('CODI_ROL') : req.body.CODI_ROL,
        NOMB_ROL: (typeof req.body.NOMB_ROL === 'undefined') ? entity.get('NOMB_ROL') : req.body.NOMB_ROL,
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
 * Elimina un rol.
 * @param {integer} req.params.id - ID de rol.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_ROL: req.params.id})
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

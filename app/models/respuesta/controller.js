import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener respuestas.
 * @param {integer} req.params.id - ID de respuesta (opcional).
 * @return {json} Respuesta(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_RESPUESTA: id}).fetch()
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
 * Agregar nueva respuesta.
 * @param {integer} req.body.IDEN_COMENTARIO - ID de Comentario a la que corresponde esta respuesta.
 * @param {string} req.body.DESC_RESPUESTA - Respuesta.
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la respuesta (opcional, por defecto now()).
 * @return {json} Respuesta. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_COMENTARIO:  req.body.IDEN_COMENTARIO,
    DESC_RESPUESTA:   req.body.DESC_RESPUESTA,
    FECH_CREACION:    req.body.FECH_CREACION
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
 * Actualiza una respuesta.
 * @param {integer} req.params.id - ID del comentario.
 * @param {integer} req.body.IDEN_COMENTARIO - ID de Comentario a la que corresponde esta respuesta (opcional).
 * @param {string} req.body.DESC_RESPUESTA - Respuesta (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la respuesta (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_RESPUESTA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_COMENTARIO:  (typeof req.body.IDEN_COMENTARIO === 'undefined') ? entity.get('IDEN_COMENTARIO') : req.body.IDEN_COMENTARIO,
        DESC_RESPUESTA:   (typeof req.body.DESC_RESPUESTA === 'undefined') ? entity.get('DESC_RESPUESTA') : req.body.DESC_RESPUESTA,
        FECH_CREACION:    (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
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
 * Elimina una respuesta.
 * @param {integer} req.params.id - ID de la respuesta.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_RESPUESTA: req.params.id})
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

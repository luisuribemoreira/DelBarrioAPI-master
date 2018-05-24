import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener calificaciones.
 * @param {integer} req.params.id - ID de calificación (opcional).
 * @return {json} Calificación(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_CALIFICACION: id}).fetch()
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
 * Agregar nueva calificación.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta calificación.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor de esta calificación.
 * @param {integer} req.body.NUMR_VALOR - Calificación en formato numérico.
 * @param {string} req.body.DESC_CALIFICACION - Texto adjunto a calificación (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si la calificación está baneada (opcional, por defecto false).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la calificación (opcional, por defecto now()).
 * @return {json} Calificación. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_PUBLICACION:   req.body.IDEN_PUBLICACION,
    IDEN_USUARIO:       req.body.IDEN_USUARIO,
    NUMR_VALOR:         req.body.NUMR_VALOR,
    DESC_CALIFICACION:  req.body.DESC_CALIFICACION,
    FLAG_BAN:           req.body.FLAG_BAN,
    FECH_CREACION:      req.body.FECH_CREACION
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
 * Actualiza una calificación.
 * @param {integer} req.params.id - ID de la calificación.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta calificación (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor de esta calificación (opcional).
 * @param {integer} req.body.NUMR_VALOR - Calificación en formato numérico (opcional).
 * @param {string} req.body.DESC_CALIFICACION - Texto adjunto a calificación (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si la calificación está baneada (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la calificación (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_CALIFICACION: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_PUBLICACION:   (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
        IDEN_USUARIO:       (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        NUMR_VALOR:         (typeof req.body.NUMR_VALOR === 'undefined') ? entity.get('NUMR_VALOR') : req.body.NUMR_VALOR,
        DESC_CALIFICACION:  (typeof req.body.DESC_CALIFICACION === 'undefined') ? entity.get('DESC_CALIFICACION') : req.body.DESC_CALIFICACION,
        FLAG_BAN:           (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN,
        FECH_CREACION:      (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
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
 * Elimina una calificación.
 * @param {integer} req.params.id - ID de la calificación.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_CALIFICACION: req.params.id})
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

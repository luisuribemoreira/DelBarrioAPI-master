import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener resoluciones de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia (opcional).
 * @return {json} Resolución(es) de denuncia. En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_RESOLUCION_DENUNCIA: id}).fetch()
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
 * Agregar nueva resolución de denuncia.
 * @param {integer} req.body.IDEN_DENUNCIA - ID de denuncia.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor.
 * @param {string} req.body.DESC_RESOLUCION - Texto descriptivo de la resolución de denuncia.
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional, por defecto now()).
 * @return {json} Denuncia. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_DENUNCIA:    req.body.IDEN_DENUNCIA,
    IDEN_USUARIO:     req.body.IDEN_USUARIO,
    DESC_RESOLUCION:  req.body.DESC_RESOLUCION,
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
 * Actualiza una resolución de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia.
 * @param {integer} req.body.IDEN_DENUNCIA - ID de denuncia (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor (opcional).
 * @param {string} req.body.DESC_RESOLUCION - Texto descriptivo de la resolución de denuncia (opcional).
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_RESOLUCION_DENUNCIA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_DENUNCIA:    (typeof req.body.IDEN_DENUNCIA === 'undefined') ? entity.get('IDEN_DENUNCIA') : req.body.IDEN_DENUNCIA,
        IDEN_USUARIO:     (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        DESC_RESOLUCION:  (typeof req.body.DESC_RESOLUCION === 'undefined') ? entity.get('DESC_RESOLUCION') : req.body.DESC_RESOLUCION,
        FECH_CREACION:    (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
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
 * Elimina una resolución de denuncia.
 * @param {integer} req.params.id - ID de resolución de denuncia.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_RESOLUCION_DENUNCIA: req.params.id})
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

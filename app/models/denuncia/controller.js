import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener denuncias.
 * @param {integer} req.params.id - ID de denuncia (opcional).
 * @return {json} Denuncia(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_DENUNCIA: id}).fetch({withRelated: ['publicacion', 'calificacion', 'comentario', 'usuario', 'usuario.persona', 'usuario.emprendedor', 'motivo_denuncia', 'resolucion_denuncia', 'resolucion_denuncia.usuario', 'resolucion_denuncia.usuario.persona']})
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
    new Collection().fetch({withRelated: ['publicacion', 'calificacion', 'comentario', 'usuario', 'usuario.persona', 'usuario.emprendedor', 'motivo_denuncia', 'resolucion_denuncia', 'resolucion_denuncia.usuario', 'resolucion_denuncia.usuario.persona']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva denuncia.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación (opcional).
 * @param {integer} req.body.IDEN_CALIFICACION - ID de calificación (opcional).
 * @param {integer} req.body.IDEN_COMENTARIO - ID de comentario (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor.
 * @param {integer} req.body.IDEN_MOTIVO_DENUNCIA - ID de motivo de denuncia.
 * @param {string} req.body.DESC_DENUNCIA - Texto descriptivo de la denuncia.
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional, por defecto now()).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la denuncia está activa (opcional, por defecto true).
 * @return {json} Denuncia. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_PUBLICACION:     req.body.IDEN_PUBLICACION,
    IDEN_CALIFICACION:    req.body.IDEN_CALIFICACION,
    IDEN_COMENTARIO:      req.body.IDEN_COMENTARIO,
    IDEN_USUARIO:         req.body.IDEN_USUARIO,
    IDEN_MOTIVO_DENUNCIA: req.body.IDEN_MOTIVO_DENUNCIA,
    DESC_DENUNCIA:        req.body.DESC_DENUNCIA,
    FECH_CREACION:        req.body.FECH_CREACION,
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
 * Actualiza una denuncia.
 * @param {integer} req.params.id - ID de denuncia.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación (opcional).
 * @param {integer} req.body.IDEN_CALIFICACION - ID de calificación (opcional).
 * @param {integer} req.body.IDEN_COMENTARIO - ID de comentario (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor (opcional).
 * @param {integer} req.body.IDEN_MOTIVO_DENUNCIA - ID de motivo de denuncia (opcional).
 * @param {string} req.body.DESC_DENUNCIA - Texto descriptivo de la denuncia (opcional).
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la denuncia está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_DENUNCIA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_PUBLICACION:     (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
        IDEN_CALIFICACION:    (typeof req.body.IDEN_CALIFICACION === 'undefined') ? entity.get('IDEN_CALIFICACION') : req.body.IDEN_CALIFICACION,
        IDEN_COMENTARIO:      (typeof req.body.IDEN_COMENTARIO === 'undefined') ? entity.get('IDEN_COMENTARIO') : req.body.IDEN_COMENTARIO,
        IDEN_USUARIO:         (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        IDEN_MOTIVO_DENUNCIA: (typeof req.body.IDEN_MOTIVO_DENUNCIA === 'undefined') ? entity.get('IDEN_MOTIVO_DENUNCIA') : req.body.IDEN_MOTIVO_DENUNCIA,
        DESC_DENUNCIA:        (typeof req.body.DESC_DENUNCIA === 'undefined') ? entity.get('DESC_DENUNCIA') : req.body.DESC_DENUNCIA,
        FECH_CREACION:        (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION,
        FLAG_VIGENTE:         (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
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
 * Elimina una denuncia.
 * @param {integer} req.params.id - ID de denuncia.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_DENUNCIA: req.params.id})
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

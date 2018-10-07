import { Model, Collection } from './model'
import Checkit from 'checkit'
import moment from 'moment'

/**
 * Obtener ofertas.
 * @param {integer} req.params.id - ID de oferta (opcional).
 * @return {json} Oferta(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_OFERTA: id}).fetch({withRelated: ['publicacion','publicacion.categoria','publicacion.imagenes', 'publicacion.emprendedor.usuario']})
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
    new Collection().fetch({withRelated: ['publicacion','publicacion.categoria','publicacion.imagenes', 'publicacion.emprendedor.usuario']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva oferta.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación a la que le corresponde esta oferta.
 * @param {datetime} req.body.FECH_INICIO - Fecha de inicio de la oferta.
 * @param {datetime} req.body.FECH_TERMINO - Fecha de término de la oferta.
 * @param {integer} req.body.NUMR_PRECIO - Precio de la oferta.
 * @param {boolean} req.body.FLAG_VALIDADO - Define si la oferta ha sido aprobada por un administrador (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_BAN - Define si la oferta está baneada (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la oferta está vigente (opcional, por defecto true).
 * @return {json} Oferta. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  let now = moment().format('DD-MM-YYYY')
  let inicio = moment(req.body.FECH_INICIO).format('DD-MM-YYYY')
  new Model({
    IDEN_PUBLICACION: req.body.IDEN_PUBLICACION,
    FECH_INICIO:      req.body.FECH_INICIO,
    FECH_TERMINO:     req.body.FECH_TERMINO,
    NUMR_PRECIO:      req.body.NUMR_PRECIO,
    FLAG_VALIDADO:    req.body.FLAG_VALIDADO,
    FLAG_BAN:         req.body.FLAG_BAN,
    FLAG_VIGENTE:     req.body.FLAG_VIGENTE ? req.body.FLAG_VIGENTE : moment(now, 'DD-MM-YYYY').isSame(moment(inicio, 'DD-MM-YYYY'))
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
 * Actualiza una oferta.
 * @param {integer} req.params.id - ID de oferta.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación a la que le corresponde esta oferta (opcional).
 * @param {datetime} req.body.FECH_INICIO - Fecha de inicio de la oferta (opcional).
 * @param {datetime} req.body.FECH_TERMINO - Fecha de término de la oferta (opcional).
 * @param {integer} req.body.NUMR_PRECIO - Precio de la oferta (opcional).
 * @param {boolean} req.body.FLAG_VALIDADO - Define si la oferta ha sido aprobada por un administrador (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_BAN - Define si la oferta está baneada (opcional, por defecto false).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_OFERTA: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_PUBLICACION: (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
        FECH_INICIO:      (typeof req.body.FECH_INICIO === 'undefined') ? entity.get('FECH_INICIO') : req.body.FECH_INICIO,
        FECH_TERMINO:     (typeof req.body.FECH_TERMINO === 'undefined') ? entity.get('FECH_TERMINO') : req.body.FECH_TERMINO,
        NUMR_PRECIO:      (typeof req.body.NUMR_PRECIO === 'undefined') ? entity.get('NUMR_PRECIO') : req.body.NUMR_PRECIO,
        FLAG_VALIDADO:    (typeof req.body.FLAG_VALIDADO === 'undefined') ? entity.get('FLAG_VALIDADO') : req.body.FLAG_VALIDADO,
        FLAG_BAN:         (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN
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
 * Elimina una oferta.
 * @param {integer} req.params.id - ID de oferta.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_OFERTA: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener emprendedores.
 * @param {integer} req.params.id - ID del emprendedor (opcional).
 * @return {json} Emprendedor(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_EMPRENDEDOR: id}).fetch({withRelated: ['usuario', 'usuario.telefonos', 'publicaciones', 'publicaciones.imagenes', 'rubro', 'imagen']})
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
    new Collection().fetch({withRelated: ['usuario', 'usuario.telefonos', 'publicaciones', 'publicaciones.imagenes', 'rubro', 'imagen']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nuevo emprendedor.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario.
 * @param {integer} req.body.IDEN_RUBRO - ID de rubro (opcional).
 * @param {integer} req.body.RUT_EMPRENDEDOR - RUT del emprendedor sin dígito verificador.
 * @param {string} req.body.DV_EMPRENDEDOR - Dígito verificador del RUT del emprendedor.
 * @param {string} req.body.DESC_EMPRENDEDOR - Descripción breve de la empresa.
 * @param {string} req.body.DESC_NOMBRE_FANTASIA - Nombre de fantasía de la empresa.
 * @param {string} req.body.DESC_NOMBRE_EMPRESA - Nombre de la empresa ante el SII.
 * @param {boolean} req.body.FLAG_VALIDADO - Define si el emprendedor validó sus datos en sistema (opcional, por defecto false).
 * @return {json} Emprendedor. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    IDEN_USUARIO:             req.body.IDEN_USUARIO,
    IDEN_RUBRO:               req.body.IDEN_RUBRO,
    RUT_EMPRENDEDOR:          req.body.RUT_EMPRENDEDOR,
    DV_EMPRENDEDOR:           req.body.DV_EMPRENDEDOR,
    DESC_EMPRENDEDOR:         req.body.DESC_EMPRENDEDOR,
    DESC_NOMBRE_FANTASIA:     req.body.DESC_NOMBRE_FANTASIA,
    DESC_NOMBRE_EMPRESA:      req.body.DESC_NOMBRE_EMPRESA,
    FLAG_VALIDADO:            req.body.FLAG_VALIDADO
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
 * Actualiza un emprendedor.
 * @param {integer} req.params.id - ID del emprendedor.
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario (opcional).
 * @param {integer} req.body.IDEN_RUBRO - ID de rubro (opcional).
 * @param {integer} req.body.RUT_EMPRENDEDOR - RUT del emprendedor sin dígito verificador (opcional).
 * @param {string} req.body.DV_EMPRENDEDOR - Dígito verificador del RUT del emprendedor (opcional).
 * @param {string} req.body.DESC_EMPRENDEDOR - Descripción breve de la empresa (opcional).
 * @param {string} req.body.DESC_NOMBRE_FANTASIA - Nombre de fantasía de la Empresa (opcional).
 * @param {string} req.body.DESC_NOMBRE_EMPRESA - Nombre de la empresa ante el SII (opcional).
 * @param {boolean} req.body.FLAG_VALIDADO - Define si el emprendedor validó sus datos en sistema (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_EMPRENDEDOR: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        IDEN_USUARIO:             (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
        IDEN_RUBRO:               (typeof req.body.IDEN_RUBRO === 'undefined') ? entity.get('IDEN_RUBRO') : req.body.IDEN_RUBRO,
        RUT_EMPRENDEDOR:          (typeof req.body.RUT_EMPRENDEDOR === 'undefined') ? entity.get('RUT_EMPRENDEDOR') : req.body.RUT_EMPRENDEDOR,
        DV_EMPRENDEDOR:           (typeof req.body.DV_EMPRENDEDOR === 'undefined') ? entity.get('DV_EMPRENDEDOR') : req.body.DV_EMPRENDEDOR,
        DESC_EMPRENDEDOR:         (typeof req.body.DESC_EMPRENDEDOR === 'undefined') ? entity.get('DESC_EMPRENDEDOR') : req.body.DESC_EMPRENDEDOR,
        DESC_NOMBRE_FANTASIA:     (typeof req.body.DESC_NOMBRE_FANTASIA === 'undefined') ? entity.get('DESC_NOMBRE_FANTASIA') : req.body.DESC_NOMBRE_FANTASIA,
        DESC_NOMBRE_EMPRESA:      (typeof req.body.DESC_NOMBRE_EMPRESA === 'undefined') ? entity.get('DESC_NOMBRE_EMPRESA') : req.body.DESC_NOMBRE_EMPRESA,
        FLAG_VALIDADO:            (typeof req.body.FLAG_VALIDADO === 'undefined') ? entity.get('FLAG_VALIDADO') : req.body.FLAG_VALIDADO
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
 * Elimina un emprendedor.
 * @param {integer} req.params.id - ID del emprendedor.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_EMPRENDEDOR: req.params.id})
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

import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener contáctos.
 * @param {integer} req.params.id - ID del contácto (opcional).
 * @return {json} contácto(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_CONTACTO: id}).fetch({withRelated: ['persona']})
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
    new Collection().fetch({withRelated: ['persona']})
      .then(entities => {
        res.json({error: false, data: entities.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Obtener contáctos por persona.
 * @param {integer} req.params.id - ID de persona.
 * @return {json} contácto(s). En caso fallido, mensaje de error.
 */
function GETByPersona (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  new Model({IDEN_PERSONA: id}).where({IDEN_PERSONA: id}).fetchAll()
    .then(entity => {
      if(!entity) {
        res.status(404).json({error: true, data: {message: 'Entity not found'}})
      } else {
        let dataObject = {}
        let dataArray = entity.toJSON()
        dataArray.forEach(contacto => {
          if (!dataObject[contacto.TIPO_CONTACTO]) {
            dataObject[contacto.TIPO_CONTACTO] = []
            dataObject[contacto.TIPO_CONTACTO].push(contacto)
          } else {
            dataObject[contacto.TIPO_CONTACTO].push(contacto)
          }
        })
        res.json({error: false, data: dataObject})
      }
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Agregar nuevo contácto.
 * @param {string} req.body.TIPO_CONTACTO - Tipo de contácto.
 * @param {string} req.body.DESC_CONTACTO - Descripción del contácto.
 * @param {integer} req.body.IDEN_PERSONA - ID de la persona dueña del contácto.
 * @return {json} contácto. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new Model({
    TIPO_CONTACTO: req.body.TIPO_CONTACTO,
    DESC_CONTACTO: req.body.DESC_CONTACTO,
    IDEN_PERSONA: req.body.IDEN_PERSONA
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
 * Actualiza un contácto.
 * @param {integer} req.params.id - ID de contácto.
 * @param {string} req.body.TIPO_CONTACTO - Tipo de contácto. (opcional)
 * @param {string} req.body.DESC_CONTACTO - Descripción del contácto. (opcional)
 * @param {integer} req.body.IDEN_PERSONA - ID de la persona dueña del contácto. (opcional)
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new Model({IDEN_CONTACTO: req.params.id})
    .fetch({require: true})
    .then(entity => {
      entity.save({
        TIPO_CONTACTO:    (typeof req.body.TIPO_CONTACTO === 'undefined') ? entity.get('TIPO_CONTACTO') : req.body.TIPO_CONTACTO,
        DESC_CONTACTO:    (typeof req.body.DESC_CONTACTO === 'undefined') ? entity.get('DESC_CONTACTO') : req.body.DESC_CONTACTO,
        IDEN_PERSONA:     (typeof req.body.IDEN_PERSONA === 'undefined') ? entity.get('IDEN_PERSONA') : req.body.IDEN_PERSONA
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
 * Elimina un contácto.
 * @param {integer} req.params.id - ID de contácto.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_CONTACTO: req.params.id})
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
  GETByPersona,
  POST,
  PUT,
  DELETE
}

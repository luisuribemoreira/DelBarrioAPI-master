import { Model, Collection } from './model'
import Checkit from 'checkit'
import validate from './validations'
import { upload, deleteFiles, deleteFile, errorHandling } from './_helpers'

/**
 * Obtener imágenes.
 * @param {integer} req.params.id - ID de imagen (opcional).
 * @return {json} Imagen(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(id != 0) {
    new Model({IDEN_IMAGEN: id}).fetch()
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
 * Agregar nueva imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen.
 * @return {json} Comentario. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  upload(req, res, err => {
    if(err) {
      res.status(400).json({error: true, data: err})
    } else {
      // Validar atributos IDEN_PUBLICACION o IDEN_EMPRENDEDOR
      var model = new Model({
        IDEN_PUBLICACION: req.body.IDEN_PUBLICACION ? parseInt(req.body.IDEN_PUBLICACION) : undefined,
        IDEN_EMPRENDEDOR: req.body.IDEN_EMPRENDEDOR ? parseInt(req.body.IDEN_EMPRENDEDOR) : undefined
      })
      return validate(model)
        .then(() => {
          if(!req.body.IDEN_PUBLICACION && !req.body.IDEN_EMPRENDEDOR) {
            deleteFiles(req.files)
            res.status(400).json({error: true, data: {message: 'IDEN_EMPRENDEDOR or IDEN_PUBLICACION is required'}})
          }
          else if(!req.files.avatar && req.body.IDEN_EMPRENDEDOR) {
            deleteFiles(req.files)
            res.status(400).json({error: true, data: {message: 'avatar is required for IDEN_EMPRENDEDOR'}})
          }
          else if(req.files.avatar && !req.body.IDEN_EMPRENDEDOR) {
            deleteFiles(req.files)
            res.status(400).json({error: true, data: {message: 'IDEN_EMPRENDEDOR is required for avatar uploading'}})
          }
          else if(!req.files.gallery && req.body.IDEN_PUBLICACION) {
            deleteFiles(req.files)
            res.status(400).json({error: true, data: {message: 'gallery is required for IDEN_PUBLICACION'}})
          }
          else if(req.files.gallery && !req.body.IDEN_PUBLICACION) {
            deleteFiles(req.files)
            res.status(400).json({error: true, data: {message: 'IDEN_PUBLICACION is required for gallery uploading'}})
          }
          else {
            var tempModelAttributes = []
            // Todo válido, fijar persistencia de archivos
            if(req.files.avatar){
              req.files.avatar.forEach(file => {
                tempModelAttributes.push(
                  {
                    IDEN_EMPRENDEDOR: req.body.IDEN_EMPRENDEDOR ? parseInt(req.body.IDEN_EMPRENDEDOR) : undefined,
                    URL_IMAGEN: file.destination + file.filename
                  }
                )
              })
            }
            else if(req.files.gallery){
              req.files.gallery.forEach(file => {
                tempModelAttributes.push(
                  {
                    IDEN_PUBLICACION: req.body.IDEN_PUBLICACION ? parseInt(req.body.IDEN_PUBLICACION) : undefined,
                    URL_IMAGEN: file.destination + file.filename
                  }
                )
              })
            }
            var collection = Collection.forge(tempModelAttributes)

            collection.invokeThen('save').then(entities => {
              res.status(200).json({error:false, data: entities})
            }).catch(errorHandling.EmprendedorUniqueConstraintError, () => {
              deleteFiles(req.files)
              res.status(400).json({error: true, data: {message: 'IDEN_EMPRENDEDOR already has avatar'}})
            }).catch(err => {
              deleteFiles(req.files)
              res.status(500).json({error: true, data: {message: 'Internal error'}})
              throw err
            })
          }
        }).catch(err => {
          deleteFiles(req.files)
          res.status(400).json({error: true, data: err})
        })
    }
  })
}

/**
 * Actualiza una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  upload(req, res, err => {
    if(err) {
      res.status(400).json({error: true, data: err})
    } else {
      new Model({IDEN_IMAGEN: req.params.id})
        .fetch({require: true})
        .then(entity => {
          let newUrl
          deleteFile(entity.attributes.URL_IMAGEN)
          if(req.files.avatar) {
            newUrl = req.files.avatar[0].destination + req.files.avatar[0].filename
          }
          else if(req.files.gallery) {
            newUrl = req.files.gallery[0].destination + req.files.gallery[0].filename
          }
          entity.save({
            URL_IMAGEN: (typeof newUrl === 'undefined') ? entity.get('URL_IMAGEN') : newUrl
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
  })
}

/**
 * Elimina una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new Model({IDEN_IMAGEN: req.params.id})
    .fetch({require: true})
    .then(entity => {
      deleteFile(entity.attributes.URL_IMAGEN)
      new Model({IDEN_IMAGEN: req.params.id})
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
    })
    .catch(Model.NotFoundError, () => {
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

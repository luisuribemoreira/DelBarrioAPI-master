import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_PUBLICACION: 'ID de publicación',
  IDEN_EMPRENDEDOR: 'ID de emprendedor'
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PUBLICACION: [{
    rule: 'number',
    message: labels.IDEN_PUBLICACION + ' debe ser de tipo "integer"'
  }, {
    rule: 'natural',
    message: labels.IDEN_PUBLICACION + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_PUBLICACIONES').where('IDEN_PUBLICACION', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_PUBLICACION + ' no existe')
          }
        })
    }
  }],
  IDEN_EMPRENDEDOR: [{
    rule: 'number',
    message: labels.IDEN_EMPRENDEDOR + ' debe ser de tipo "integer"'
  }, {
    rule: 'natural',
    message: labels.IDEN_EMPRENDEDOR + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('PER_EMPRENDEDORES').where('IDEN_EMPRENDEDOR', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_EMPRENDEDOR + ' no existe')
          }
        })
    }
  }]
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
}

// Se exporta función
export default validate

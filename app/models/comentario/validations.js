import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_PUBLICACION: 'ID de publicación',
  IDEN_USUARIO: 'ID de usuario',
  DESC_COMENTARIO: 'Texto del comentario',
  FLAG_BAN: 'Baneo'
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PUBLICACION: [{
    rule: 'required',
    label: labels.IDEN_PUBLICACION
  }, {
    rule: 'number',
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
  IDEN_USUARIO: [{
    rule: 'required',
    label: labels.IDEN_USUARIO
  }, {
    rule: 'number',
    message: labels.IDEN_USUARIO + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('USR_USUARIOS').where('IDEN_USUARIO', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_USUARIO + ' no existe')
          }
        })
    }
  }],
  DESC_COMENTARIO: [{
    rule: 'required',
    label: labels.DESC_COMENTARIO
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_COMENTARIO
  }],
  FLAG_BAN: [{
    rule: 'boolean',
    label: labels.FLAG_BAN
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

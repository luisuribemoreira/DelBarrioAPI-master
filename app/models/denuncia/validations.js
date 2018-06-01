import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_PUBLICACION: 'ID de publicación',
  IDEN_CALIFICACION: 'ID de calificación',
  IDEN_COMENTARIO: 'ID de comentario',
  IDEN_USUARIO: 'ID de usuario',
  IDEN_MOTIVO_DENUNCIA: 'ID de motivo de denuncia',
  DESC_DENUNCIA: 'Descripción de denuncia',
  FECH_CREACION: 'Fecha de creación',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PUBLICACION: [{
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
  IDEN_CALIFICACION: [{
    rule: 'number',
    message: labels.IDEN_CALIFICACION + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_CALIFICACIONES').where('IDEN_CALIFICACION', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_CALIFICACION + ' no existe')
          }
        })
    }
  }],
  IDEN_COMENTARIO: [{
    rule: 'number',
    message: labels.IDEN_COMENTARIO + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_COMENTARIOS').where('IDEN_COMENTARIO', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_COMENTARIO + ' no existe')
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
  IDEN_MOTIVO_DENUNCIA: [{
    rule: 'required',
    label: labels.IDEN_MOTIVO_DENUNCIA
  }, {
    rule: 'number',
    message: labels.IDEN_MOTIVO_DENUNCIA + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_MOTIVOS_DENUNCIA').where('IDEN_MOTIVO_DENUNCIA', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_MOTIVO_DENUNCIA + ' no existe')
          }
        })
    }
  }],
  DESC_DENUNCIA: [{
    rule: 'required',
    label: labels.DESC_DENUNCIA
  }, {
    rule: 'minLength:10',
    label: labels.DESC_DENUNCIA
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_DENUNCIA
  }],
  FLAG_VIGENTE: [{
    rule: 'boolean',
    label: labels.FLAG_VIGENTE
  }]
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
}

// Se exporta la función
export default validate

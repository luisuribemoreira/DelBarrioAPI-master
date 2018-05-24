import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_DENUNCIA: 'ID de denuncia',
  IDEN_USUARIO: 'ID de usuario',
  DESC_RESOLUCION: 'Texto de resolución de denuncia',
  FECH_CREACION: 'Fecha de creación'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_DENUNCIA: [{
    rule: 'required',
    label: labels.IDEN_DENUNCIA
  }, {
    rule: 'number',
    message: labels.IDEN_DENUNCIA + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('REQ_DENUNCIAS').where('IDEN_DENUNCIA', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_DENUNCIA + ' no existe')
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
  DESC_RESOLUCION: [{
    rule: 'required',
    label: labels.DESC_RESOLUCION
  }, {
    rule: 'minLength:5',
    label: labels.DESC_RESOLUCION
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_RESOLUCION
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

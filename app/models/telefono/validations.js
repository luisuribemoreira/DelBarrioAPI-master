import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_USUARIO: 'ID de usuario',
  NUMR_FONO: 'Número de teléfono',
  CODI_FONO: 'Código de identificación de tipo de teléfono'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
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
  NUMR_FONO: [{
    rule: 'required',
    label: labels.NUMR_FONO
  }, {
    rule: 'maxLength:255',
    label: labels.NUMR_FONO
  }],
  CODI_FONO: [{
    rule: 'required',
    label: labels.CODI_FONO
  }, {
    rule: 'number',
    message: labels.CODI_FONO + ' debe ser integer'
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

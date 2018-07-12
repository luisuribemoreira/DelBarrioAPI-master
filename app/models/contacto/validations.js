import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_PERSONA: 'ID de persona',
  TIPO_CONTACTO: 'Tipo de contácto',
  DESC_CONTACTO: 'Descripción del contácto' // El contacto en sí, es decir, el nro de teléfono o el correo, etc.
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_PERSONA: [{
    rule: 'required',
    label: labels.IDEN_PERSONA
  }, {
    rule: 'number',
    message: labels.IDEN_PERSONA + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('PER_PERSONAS').where('IDEN_PERSONA', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_PERSONA + ' no existe')
          }
        })
    }
  }],
  TIPO_CONTACTO: [{
    rule: 'required',
    label: labels.TIPO_CONTACTO
  }, {
    rule: 'maxLength:255',
    label: labels.TIPO_CONTACTO
  }],
  DESC_CONTACTO: [{
    rule: 'required',
    label: labels.DESC_CONTACTO
  }, {
    rule: 'maxLength:255',
    message: labels.DESC_CONTACTO
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

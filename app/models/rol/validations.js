import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  CODI_ROL: 'Código único del rol',
  NOMB_ROL: 'Nombre del rol'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  CODI_ROL: [{
    rule: 'required',
    label: labels.CODI_ROL
  }, {
    rule: 'number',
    message: labels.CODI_ROL + ' debe ser integer'
  }, {
    rule: function (val){
      return knex('SIS_ROLES').where('CODI_ROL', '=', val)
        .then(resp => {
          if (resp.length > 0){
            throw new Error(labels.CODI_ROL + ' ya existe')
          }
        })
    }
  }],
  NOMB_ROL: [{
    rule: 'required',
    label: labels.NOMB_ROL
  }, {
    rule: 'string',
    label: labels.NOMB_ROL
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_ROL
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

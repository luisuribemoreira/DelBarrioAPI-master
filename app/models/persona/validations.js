import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_USUARIO: 'ID de usuario',
  NOMBRES: 'Nombres',
  APELLIDO_PATERNO: 'Apellido Paterno',
  APELLIDO_MATERNO: 'Apellido Materno',
  FECH_FECHA_NACIMIENTO: 'Fecha de Nacimiento'
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
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
  NOMBRES: [{
    rule: 'required',
    label: labels.NOMB_FAQ
  }, {
    rule: 'string',
    label: labels.NOMB_FAQ
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_FAQ
  }],
  APELLIDO_PATERNO: [{
    rule: 'required',
    label: labels.APELLIDO_PATERNO
  }, {
    rule: 'string',
    label: labels.APELLIDO_PATERNO
  }, {
    rule: 'maxLength:255',
    label: labels.APELLIDO_PATERNO
  }],
  APELLIDO_MATERNO: [{
    rule: 'required',
    label: labels.APELLIDO_MATERNO
  }, {
    rule: 'string',
    label: labels.APELLIDO_MATERNO
  }, {
    rule: 'maxLength:255',
    label: labels.APELLIDO_MATERNO
  }],
  FECH_FECHA_NACIMIENTO: [{
    rule: 'required',
    label: labels.FECH_FECHA_NACIMIENTO
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

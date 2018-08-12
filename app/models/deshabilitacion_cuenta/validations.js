import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  IDEN_USUARIO: 'ID de Usuario',
  IDEN_MOTIVO_DESHABILITACION: 'Motivo de deshabilitación',
  DESC_COMENTARIO: 'Descripción de la deshabilitación',
  FECH_CREACION: 'Fecha de creación',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_USUARIO: [{
    rule: 'required',
    label: labels.IDEN_USUARIO,
  }, {
    rule: 'number',
    message: labels.IDEN_USUARIO + ' debe ser de tipo "integer"'
  }, {
    rule: 'natural',
    message: labels.IDEN_USUARIO + ' debe ser de tipo "integer"'
  }],
  IDEN_MOTIVO_DESHABILITACION: [{
    rule: 'required',
    label: labels.IDEN_MOTIVO_DESHABILITACION
  }, {
    rule: 'number',
    message: labels.IDEN_MOTIVO_DESHABILITACION + ' debe ser de tipo "integer"'
  }, {
    rule: 'natural',
    message: labels.IDEN_MOTIVO_DESHABILITACION + ' debe ser de tipo "integer"'
  }],
  DESC_COMENTARIO: [{
    rule: 'required',
    label: labels.IDEN_MOTIVO_DESHABILITACION
  }, {
    rule: 'string',
    label: labels.IDEN_MOTIVO_DESHABILITACION
  }, {
    rule: 'minLength:5',
    label: labels.IDEN_MOTIVO_DESHABILITACION
  }, {
    rule: 'maxLength:255',
    label: labels.IDEN_MOTIVO_DESHABILITACION
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

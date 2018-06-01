import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  NOMB_MOTIVO_DESHABILITACION: 'Motivo de deshabilitación',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_MOTIVO_DESHABILITACION: [{
    rule: 'required',
    label: labels.NOMB_MOTIVO_DESHABILITACION
  }, {
    rule: 'minLength:5',
    label: labels.NOMB_MOTIVO_DESHABILITACION
  }, {
    rule: 'maxLength:100',
    label: labels.NOMB_MOTIVO_DESHABILITACION
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

import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  NOMB_FAQ: 'Pregunta frecuente',
  DESC_FAQ: 'Respuesta'
}

// Valores nativos de validaciones checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_FAQ: [{
    rule: 'required',
    label: labels.NOMB_FAQ
  }, {
    rule: 'string',
    label: labels.NOMB_FAQ
  }, {
    rule: 'minLength:5',
    label: labels.NOMB_FAQ
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_FAQ
  }],
  DESC_FAQ: [{
    rule: 'required',
    label: labels.DESC_FAQ
  }, {
    rule: 'string',
    label: labels.DESC_FAQ
  }, {
    rule: 'minLength:5',
    label: labels.DESC_FAQ
  }, {
    rule: 'maxLength:1000',
    label: labels.DESC_FAQ
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

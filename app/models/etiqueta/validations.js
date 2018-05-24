import Checkit from 'checkit'

// Nombres de atributos en formato legible
const labels = {
  NOMB_ETIQUETA: 'Nombre de la etiqueta'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_ETIQUETA: [{
    rule: 'required',
    label: labels.NOMB_ETIQUETA
  }, {
    rule: 'string',
    label: labels.NOMB_ETIQUETA
  }, {
    rule: 'maxLength:255',
    label: labels.NOMB_ETIQUETA
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

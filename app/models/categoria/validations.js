import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  NOMB_CATEGORIA: 'Nombre de categoría',
  IDEN_CATEGORIA_PADRE: 'Categoría padre',
  FLAG_VIGENTE: 'Vigencia'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  NOMB_CATEGORIA: [{
    rule: 'required',
    label: labels.NOMB_CATEGORIA
  }, {
    rule: 'minLength:5',
    label: labels.NOMB_CATEGORIA
  }, {
    rule: 'maxLength:50',
    label: labels.NOMB_CATEGORIA
  }],
  IDEN_CATEGORIA_PADRE: ['number', function (id) {
    return knex('REQ_CATEGORIAS').where('IDEN_CATEGORIA', '=', id).then(resp => {
      if(resp.length == 0) throw new Error(labels.IDEN_CATEGORIA_PADRE + ' no existe')
      if(resp[0].IDEN_CATEGORIA_PADRE != null) throw new Error(labels.IDEN_CATEGORIA_PADRE + ' no puede poseer padre')
    })
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

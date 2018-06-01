import Checkit from 'checkit'
import { knex } from '../../connection'

// Nombres de atributos en formato legible
const labels = {
  IDEN_USUARIO: 'ID de usuario',
  IDEN_RUBRO: 'ID de rubro',
  RUT_EMPRENDEDOR: 'RUT',
  DV_EMPRENDEDOR: 'Dígito verificador',
  DESC_EMPRENDEDOR: 'Descripción del emprendedor',
  DESC_NOMBRE_FANTASIA: 'Nombre de fantasía del emprendedor',
  DESC_NOMBRE_EMPRESA: 'Nombre real de la empresa',
  FLAG_VALIDADO: 'Validación de cuenta'
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
  IDEN_RUBRO: [{
    rule: 'number',
    message: labels.IDEN_RUBRO + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('PER_RUBROS').where('IDEN_RUBRO', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_RUBRO + ' no existe')
          }
        })
    }
  }],
  RUT_EMPRENDEDOR: [{
    rule: 'required',
    label: labels.RUT_EMPRENDEDOR
  }, {
    rule: 'number',
    message: labels.RUT_EMPRENDEDOR + ' debe ser de tipo "integer"'
  }],
  DV_EMPRENDEDOR: [{
    rule: 'required',
    label: labels.DV_EMPRENDEDOR
  }, {
    rule: 'string',
    label: labels.DV_EMPRENDEDOR
  }, {
    rule: 'maxLength:1',
    label: labels.DV_EMPRENDEDOR
  }, {
    rule: function (val) {
      return new Promise(resolve => {
        resolve((val != '0' && val != '1' && val != '2' && val != '3' && val != '4' && val != '5' && val != '6' && val != '7' && val != '8' && val != '9' && val != 'k'  && val != 'K'))
      })
        .then(val => {
          if(val) throw new Error(labels.DV_EMPRENDEDOR + ' inválido')
        })
    }
  }],
  DESC_EMPRENDEDOR: [{
    rule: 'string',
    label: labels.DESC_EMPRENDEDOR
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_EMPRENDEDOR
  }],
  DESC_NOMBRE_FANTASIA: [{
    rule: 'required',
    label: labels.DESC_NOMBRE_FANTASIA
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_NOMBRE_FANTASIA
  }],
  DESC_NOMBRE_EMPRESA: [{
    rule: 'required',
    label: labels.DESC_NOMBRE_EMPRESA
  }, {
    rule: 'maxLength:255',
    label: labels.DESC_NOMBRE_EMPRESA
  }],
  FLAG_VALIDADO: [{
    rule: 'boolean',
    label: labels.FLAG_VALIDADO
  }]
}

// Validación exclusiva para RUT mediante Checkit
const rutValidation = {
  RUT_EMPRENDEDOR: [{
    rule: function (val) {
      return new Promise(resolve => {
        resolve(Fn.rutValidate(val))
      })
        .then(val => {
          if(!val) throw new Error('RUT inválido')
        })
    }
  }]
}

// Función de validación a utilizar en conjunto a rutValidation
const Fn = {
  rutValidate: fullRut => {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(fullRut))
      return false
    var tmp = fullRut.split('-')
    var digv = tmp[1]
    var rut = tmp[0]
    if (digv == 'K') digv = 'k'
    return (Fn.dv(rut) == digv)
  },
  dv: T => {
    var M = 0
    var S = 1
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11
    return S ? S - 1 : 'k'
  }
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
    .then(() => {
      return Checkit(rutValidation).run({RUT_EMPRENDEDOR: model.attributes.RUT_EMPRENDEDOR + '-' + model.attributes.DV_EMPRENDEDOR})
    })
}

// Se exporta función
export default validate

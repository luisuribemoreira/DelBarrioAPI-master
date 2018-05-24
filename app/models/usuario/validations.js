import Checkit from 'checkit'
import { knex } from '../../connection'
import { genHash } from '../../auth/_helpers'

// Nombres de atributos en formato legible
const labels = {
  IDEN_ROL: 'ID de rol',
  EMAIL_USUARIO: 'Correo electrónico',
  DESC_PASSWORD: 'Contraseña',
  FLAG_VIGENTE: 'Vigencia',
  FLAG_BAN: 'Baneo'
}

// Valores nativos de validaciones Checkit en https://github.com/tgriesser/checkit
const validations = {
  IDEN_ROL: [{
    rule: 'required',
    label: labels.IDEN_ROL
  }, {
    rule: 'number',
    message: labels.IDEN_ROL + ' debe ser de tipo "integer"'
  }, {
    rule: function (val){
      return knex('SIS_ROLES').where('IDEN_ROL', '=', val)
        .then(resp => {
          if (resp.length == 0){
            throw new Error(labels.IDEN_ROL + ' no existe')
          }
        })
    }
  }],
  EMAIL_USUARIO: [{
    rule: 'required',
    label: labels.EMAIL_USUARIO
  }, {
    rule: 'email',
    label: labels.EMAIL_USUARIO
  }],
  DESC_PASSWORD: [{
    rule: 'required',
    label: labels.DESC_PASSWORD
  }, {
    rule: 'string',
    label: labels.DESC_PASSWORD
  }, {
    rule: 'minLength:6',
    label: labels.DESC_PASSWORD
  }],
  FLAG_VIGENTE: [{
    rule: 'boolean',
    label: labels.FLAG_VIGENTE
  }],
  FLAG_BAN: [{
    rule: 'boolean',
    label: labels.FLAG_BAN
  }]
}

// Validación de mail exclusiva para POST y PUT con EMAIL_USUARIO actualizado
const mailComparison = {
  rule: function (val){
    return knex('USR_USUARIOS').where('EMAIL_USUARIO', '=', val)
      .then(resp => {
        if (resp.length > 0){
          throw new Error(labels.EMAIL_USUARIO + ' ya está registrado')
        }
      })
  }
}

/**
 * Ejecuta validaciones de un modelo, retornando Promise
 * @param {bookshelf.Model} model Modelo a validar
 */
function validate (model) {
  var verificateMail = ((typeof model.attributes.IDEN_USUARIO === 'undefined') || model.attributes.EMAIL_USUARIO !== model._previousAttributes.EMAIL_USUARIO)
  if(verificateMail) {
    if(validations.EMAIL_USUARIO.length === 2)
      validations.EMAIL_USUARIO.push(mailComparison)
  } else {
    if(validations.EMAIL_USUARIO.length === 3)
      validations.EMAIL_USUARIO.pop()
  }
  return Checkit(validations, {language: 'es'}).run(model.toJSON())
    .then(() => {
      // If password isn't a hash, update it before saving
      if (! /^\$2[ayb]\$.{56}$/.test(model.attributes.DESC_PASSWORD))
        model.attributes.DESC_PASSWORD = genHash(model.attributes.DESC_PASSWORD)
    })
}

// Se exporta la función
export default validate

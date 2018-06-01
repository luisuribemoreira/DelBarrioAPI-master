const bcrypt = require('bcryptjs')
const omitDeep = require('omit-deep')
const _ = require('lodash')

/**
 * Comparación de una contraseña respecto a su hash.
 * @param {string} userPassword - Contraseña como texto plano.
 * @param {string} databasePassword - Contraseña como hash bcrypt.
 * @return {boolean} Define si las contraseñas coinciden.
 */
function comparePass (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}

/**
 * Generar hash bcrypt en base a texto plano.
 * @param {string} password - Contraseña en texto plano.
 * @return {string} Contraseña como hash bcrypt.
 */
function genHash (password) {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

/**
 * Funciones para filtrar datos de los retornos JSON
 */
var filter = {
  tokenPayload: function (entity) {
    // Retornar objeto custom porque YOLO
    return {
      id: entity.IDEN_USUARIO,
      nombre: Object.keys(entity.emprendedor).length === 0 ? `${entity.persona.NOMBRES} ${entity.persona.APELLIDO_PATERNO} ${entity.persona.APELLIDO_MATERNO}` : entity.emprendedor.DESC_NOMBRE_FANTASIA,
      rol: entity.rol.CODI_ROL,
      permisos: _.map(entity.rol.permisos, 'CODI_PERMISO')
    }
  },
  getUsuario: function (entity) {
    // Atributos a omitir del JSON recibido
    var omit = ['IDEN_USUARIO', 'IDEN_ROL', 'DESC_PASSWORD', 'FLAG_VIGENTE', 'FLAG_BAN', 'IDEN_PERSONA']
    // Identifica si el usuario es una persona o emprendedor, y omitirá el objeto vacío
    omit.push(Object.keys(entity.emprendedor).length === 0 ? 'emprendedor' : 'persona')
    // Correr omitDeep y retornar JSON resultante
    return omitDeep(entity, omit)
  }
}

/* Se exportan los métodos */
module.exports = {
  comparePass,
  genHash,
  filter
}

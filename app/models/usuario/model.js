import { bookshelf } from '../../connection'
import validate from './validations'
// import { genHash } from '../../auth/_helpers' -- ToDo

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'USR_USUARIOS',
  idAttribute: 'IDEN_USUARIO',
  rol: function () {
    return this.belongsTo(require('../rol/model').Model, 'IDEN_ROL')
  },
  telefonos: function () {
    return this.hasMany(require('../telefono/model').Model, 'IDEN_USUARIO')
  },
  persona: function () {
    return this.hasOne(require('../persona/model').Model, 'IDEN_USUARIO')
  },
  emprendedor: function () {
    return this.hasOne(require('../emprendedor/model').Model, 'IDEN_USUARIO')
  },
  initialize: function () {
    this.on('saving', validate, this)
  }
})

/* Se define colección a partir del modelo */
const Collection = bookshelf.Collection.extend({
  model: Model
})

/* Se exportan las constantes */
module.exports = {
  Model,
  Collection,
}

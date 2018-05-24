import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_EMPRENDEDORES',
  idAttribute: 'IDEN_EMPRENDEDOR',
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
  },
  rubro: function () {
    return this.belongsTo(require('../rubro/model').Model, 'IDEN_RUBRO')
  },
  imagen: function () {
    return this.hasOne(require('../imagen/model').Model, 'IDEN_EMPRENDEDOR')
  },
  publicaciones: function () {
    return this.hasMany(require('../publicacion/model').Model, 'IDEN_EMPRENDEDOR')
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

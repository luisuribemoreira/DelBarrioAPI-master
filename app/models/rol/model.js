import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'SIS_ROLES',
  idAttribute: 'IDEN_ROL',
  permisos: function () {
    return this.belongsToMany(require('../permiso/model').Model, 'SIS_PERMISOS_ROLES', 'IDEN_ROL', 'IDEN_PERMISO')
  },
  initialize: function () {
    this.on('saving', validate, this)
  }
})

/* Se define colección a partir del modelo */
const Collection = bookshelf.Collection.extend({
  model: Model
})

/* Exports all methods */
module.exports = {
  Model,
  Collection,
}

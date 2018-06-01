import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'SIS_PERMISOS',
  idAttribute: 'IDEN_PERMISO',
  roles: function () {
    return this.belongsToMany(require('../rol/model').Model, 'SIS_PERMISOS_ROLES', 'IDEN_PERMISO', 'IDEN_ROL')
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

import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'PER_RUBROS',
  idAttribute: 'IDEN_RUBRO',
  emprendedores: function () {
    return this.hasMany(require('../emprendedor/model').Model, 'IDEN_RUBRO')
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

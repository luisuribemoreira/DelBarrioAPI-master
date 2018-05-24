import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_ETIQUETAS',
  idAttribute: 'IDEN_ETIQUETA',
  publicaciones: function () {
    return this.belongsToMany(require('../publicacion/model').Model, 'REQ_PUBLICACIONES_ETIQUETAS', 'IDEN_ETIQUETA', 'IDEN_PUBLICACION')
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

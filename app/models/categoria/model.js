import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_CATEGORIAS',
  idAttribute: 'IDEN_CATEGORIA',
  subcategorias: function () {
    return this.hasMany(require('../categoria/model').Model, 'IDEN_CATEGORIA_PADRE')
  },
  publicaciones: function () {
    return this.hasMany(require('../publicacion/model').Model, 'IDEN_PUBLICACION')
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

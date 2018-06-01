import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_COMENTARIOS',
  idAttribute: 'IDEN_COMENTARIO',
  publicacion: function () {
    return this.belongsTo(require('../publicacion/model').Model, 'IDEN_PUBLICACION')
  },
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
  },
  respuesta: function () {
    return this.hasOne(require('../respuesta/model').Model, 'IDEN_COMENTARIO')
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

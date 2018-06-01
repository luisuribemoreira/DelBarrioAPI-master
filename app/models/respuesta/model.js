import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_RESPUESTAS',
  idAttribute: 'IDEN_RESPUESTA',
  comentario: function () {
    return this.belongsTo(require('../comentario/model').Model, 'IDEN_COMENTARIO')
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

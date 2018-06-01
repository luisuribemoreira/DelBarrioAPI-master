import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_RESOLUCION_DENUNCIAS',
  idAttribute: 'IDEN_RESOLUCION_DENUNCIA',
  denuncia: function () {
    return this.belongsTo(require('../denuncia/model').Model, 'IDEN_DENUNCIA')
  },
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
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

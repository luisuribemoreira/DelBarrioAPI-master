import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_MOTIVOS_DENUNCIA',
  idAttribute: 'IDEN_MOTIVO_DENUNCIA',
  denuncias: function () {
    return this.hasMany(require('../denuncia/model').Model, 'IDEN_MOTIVO_DENUNCIA')
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

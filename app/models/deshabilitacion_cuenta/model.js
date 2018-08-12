import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_DESHABILITACION_CUENTAS',
  idAttribute: 'IDEN_DESHABILITACION_CUENTA',
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
  },
  motivo_deshabilitacion: function () {
    return this.belongsTo(require('../persona/model').Model, 'IDEN_MOTIVO_DESHABILITACION')
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

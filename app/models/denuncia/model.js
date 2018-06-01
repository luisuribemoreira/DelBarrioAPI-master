import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_DENUNCIAS',
  idAttribute: 'IDEN_DENUNCIA',
  publicacion: function () {
    return this.belongsTo(require('../publicacion/model').Model, 'IDEN_PUBLICACION')
  },
  calificacion: function () {
    return this.belongsTo(require('../calificacion/model').Model, 'IDEN_CALIFICACION')
  },
  comentario: function () {
    return this.belongsTo(require('../comentario/model').Model, 'IDEN_COMENTARIO')
  },
  usuario: function () {
    return this.belongsTo(require('../usuario/model').Model, 'IDEN_USUARIO')
  },
  motivo_denuncia: function () {
    return this.belongsTo(require('../motivo_denuncia/model').Model, 'IDEN_MOTIVO_DENUNCIA')
  },
  resolucion_denuncia: function () {
    return this.hasOne(require('../resolucion_denuncia/model').Model, 'IDEN_DENUNCIA')
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

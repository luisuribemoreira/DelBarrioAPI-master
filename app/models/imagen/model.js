import { bookshelf } from '../../connection'
import validate from './validations'

/* Se define el modelo */
const Model = bookshelf.Model.extend({
  tableName: 'REQ_IMAGENES',
  idAttribute: 'IDEN_IMAGEN',
  publicacion: function () {
    return this.belongsTo(require('../publicacion/model').Model, 'IDEN_PUBLICACION')
  },
  emprendedor: function () {
    return this.belongsTo(require('../emprendedor/model').Model, 'IDEN_EMPRENDEDOR')
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

const omitDeep = require('omit-deep')

/**
 * Funciones para filtrar datos de los retornos JSON
 */
var filter = {
  GETall: function (entities) {
    var omit = ['IDEN_CATEGORIA_PADRE']
    return omitDeep(entities.toJSON(), omit)
  },
  GETsingle: function (entity) {
    var omit = ['IDEN_CATEGORIA', 'FLAG_VIGENTE']
    return omitDeep(entity.toJSON(), omit)
  }
}

/* Se exportan los métodos */
module.exports = {
  filter
}

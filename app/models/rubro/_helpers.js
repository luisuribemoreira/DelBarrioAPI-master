const omitDeep = require('omit-deep')

/**
 * Funciones para filtrar datos de los retornos JSON
 */
var filter = {
  GETsingle: function (entity) {
    var omit = ['IDEN_RUBRO', 'FLAG_VIGENTE']
    return omitDeep(entity.toJSON(), omit)
  }
}

/* Se exportan los métodos */
module.exports = {
  filter
}

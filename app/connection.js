import cn from '../config'

// Se inicializa el Query Builder
const knex = require('knex')(cn.knexConfig)

// Se inicializa el ORM
var bookshelf = require('bookshelf')(knex)

// Inicializar plugins de bookshelf
bookshelf.plugin('pagination')

// Se exporta el ORM
module.exports = {
  bookshelf,
  knex,
}

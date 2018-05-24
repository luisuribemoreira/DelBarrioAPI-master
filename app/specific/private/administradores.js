import { Collection } from '../../models/persona/model'

/**
 * Obtener personas.
 * @param {integer} req.params.id - ID de persona (opcional).
 * @return {json} Persona(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  new Collection().fetch({withRelated: ['usuario', {'usuario.rol': query => {
    query.where('CODI_ROL', '103')
  }}
  ]})
    .then(entities => {
      res.json({error: false, data: entities.toJSON().filter(f => typeof f.usuario.rol.CODI_ROL !== 'undefined')})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET
}

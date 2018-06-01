import _ from 'lodash'
import { Collection as Publicaciones } from '../../models/publicacion/model'
import { Collection as Emprendedores } from '../../models/emprendedor/model'

function GET (req, res) {
  new Publicaciones().orderBy('IDEN_PUBLICACION').fetch({withRelated: ['categoria', 'oferta', 'calificaciones', {'imagenes': query => {
    query.orderBy('IDEN_IMAGEN')
  }}
  ]}).then(publicaciones => {
    let pubs = publicaciones.toJSON()
    pubs.forEach(jsonEntity => {
      jsonEntity.NUMR_CALIFICACION = jsonEntity.calificaciones.length >= 5 ? _.meanBy(jsonEntity.calificaciones, e => { return e.NUMR_VALOR }) : 0
      delete jsonEntity.calificaciones
    })
    pubs = _.take((_.orderBy(pubs, ['NUMR_CALIFICACION'], ['desc'])), 12)
    new Emprendedores().fetch({withRelated: ['usuario', 'usuario.telefonos', 'publicaciones', 'publicaciones.imagenes', 'rubro', 'imagen']})
      .then(emprendedores => {
        let empr = _.sampleSize(emprendedores.toJSON(), 10)
        res.json({error: false, data: { publicaciones: pubs, emprendedores: empr }})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }).catch(err => {
    res.status(500).json({error: true, data: {message: 'Internal error'}})
    throw err
  })
}

/* Se exportan los métodos */
module.exports = {
  GET
}

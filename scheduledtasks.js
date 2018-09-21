import cron from 'node-cron'
import Ofertas from './app/models/oferta/model'
import moment from 'moment'

// Se ejecuta todos los dias a las 12:00
// Cambia el FLAG_VIGENTE de true a false
// en las ofertas que ya expiraron.
// Las cambia al dia siguiente del termino. Ej; Si termina el 11, el 12 se cambia a false.
cron.schedule('0 0 0 * * *', function(){
  new Ofertas.Collection().fetch({})
    .then(entities => {
      let ofertas = entities.toJSON()
      ofertas.forEach(oferta => {
        let FECH_TERMINO = moment(oferta.FECH_TERMINO).format('YYYY-MM-DD')
        let fechaActual = moment().format('YYYY-MM-DD')
        if (moment(fechaActual).isAfter(FECH_TERMINO) && oferta.FLAG_VIGENTE) {
          new Ofertas.Model({IDEN_OFERTA: oferta.IDEN_OFERTA}).fetch({require: true})
            .then(entity => {
              entity.save({
                IDEN_PUBLICACION: oferta.IDEN_PUBLICACION,
                FECH_INICIO:      oferta.FECH_INICIO,
                FECH_TERMINO:     oferta.FECH_TERMINO,
                NUMR_PRECIO:      oferta.NUMR_PRECIO,
                FLAG_VALIDADO:    oferta.FLAG_VALIDADO,
                FLAG_BAN:         oferta.FLAG_BAN,
                FLAG_VIGENTE:     false
              }).catch(err => {
                console.log(err)
              })
            })
        }
      })
    }).catch(err => {
      console.log(err)
    })
})

/*
* Cambia las ofertas a vigentes una vez la fecha de inicio es igual a la fecha actual.
*/
cron.schedule('0 0 0 * * *', function(){
  new Ofertas.Collection().fetch({})
    .then(entities => {
      let ofertas = entities.toJSON()
      ofertas.forEach(oferta => {
        let fechaActual = moment().format('YYYY-MM-DD')
        let FECH_INICIO = moment(oferta.FECH_INICIO).format('YYYY-MM-DD')
        if (moment(fechaActual).isSame(FECH_INICIO) && !oferta.FLAG_VIGENTE) {
          new Ofertas.Model({IDEN_OFERTA: oferta.IDEN_OFERTA}).fetch({require: true})
            .then(entity => {
              entity.save({
                IDEN_PUBLICACION: oferta.IDEN_PUBLICACION,
                FECH_INICIO:      oferta.FECH_INICIO,
                FECH_TERMINO:     oferta.FECH_TERMINO,
                NUMR_PRECIO:      oferta.NUMR_PRECIO,
                FLAG_VALIDADO:    oferta.FLAG_VALIDADO,
                FLAG_BAN:         oferta.FLAG_BAN,
                FLAG_VIGENTE:     true
              }).catch(err => {
                console.log(err)
              })
            })
        }
      })
    }).catch(err => {
      console.log(err)
    })
})
import routesInicio from './_inicio/routes'
import routesAuth from './auth/private.routes'
import routesCalificacion from './models/calificacion/private.routes'
import routesCategoria from './models/categoria/private.routes'
import routesComentario from './models/comentario/private.routes'
import routesEmprendedor from './models/emprendedor/private.routes'
import routesFaq from './models/faq/private.routes'
import routesImagen from './models/imagen/private.routes'
import routesMotivoDenuncia from './models/motivo_denuncia/private.routes'
import routesMotivoDeshabilitacion from './models/motivo_deshabilitacion/private.routes'
import routesOferta from './models/oferta/private.routes'
import routesPersona from './models/persona/private.routes'
import routesPublicacion from './models/publicacion/private.routes'
import routesRespuesta from './models/respuesta/private.routes'
import routesRubro from './models/rubro/private.routes'
import routesTelefono from './models/telefono/private.routes'
import routesUsuario from './models/usuario/private.routes'
import routesTerminosCondiciones from './models/terminos_condiciones/private.routes'
import routesDenuncia from './models/denuncia/private.routes'
import routesResolucionDenuncia from './models/resolucion_denuncia/private.routes'

import specificRoutes from './specific/private.routes'

const routes = [
  routesInicio,
  routesAuth,
  routesCalificacion,
  routesCategoria,
  routesComentario,
  routesEmprendedor,
  routesFaq,
  routesImagen,
  routesMotivoDenuncia,
  routesMotivoDeshabilitacion,
  routesOferta,
  routesPersona,
  routesPublicacion,
  routesRespuesta,
  routesRubro,
  routesTelefono,
  routesUsuario,
  routesTerminosCondiciones,
  routesDenuncia,
  routesResolucionDenuncia,
  specificRoutes
]

export default routes

import routesInicio from './_inicio/routes'
import routesAuth from './auth/public.routes'
import routesRubro from './models/rubro/public.routes'
import routesEmprendedor from './models/emprendedor/public.routes'
import routesCategoria from './models/categoria/public.routes'
import routesPersona from './models/persona/public.routes'
import routesFaq from './models/faq/public.routes'
import routesPublicacion from './models/publicacion/public.routes'
import routesOferta from './models/oferta/public.routes'
import routesImagen from './models/imagen/public.routes'
import routesMotivoDenuncia from './models/motivo_denuncia/public.routes'
import routesContacto from './models/contacto/public.routes'
import routesUsuario from './models/usuario/public.routes'
import emailRoute from './specific/emailer'
import specificRoutes from './specific/public.routes'

/*
* Todas las rutas públicas para desarrollo
*/
const routes = [
  routesInicio,
  routesAuth,
  routesRubro,
  routesEmprendedor,
  routesCategoria,
  routesPersona,
  routesFaq,
  routesPublicacion,
  routesOferta,
  routesImagen,
  specificRoutes,
  routesMotivoDenuncia,
  routesContacto,
  routesUsuario,
  emailRoute.app
]

export default routes

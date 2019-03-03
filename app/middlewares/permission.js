
// middleware para evaluar si un usuario tiene el permiso en las diferentes rutas de la aplicación
function permit (allowed) {
  // Se declara un arreglo vacio para guardar los codigos de los permisos que mantiene el usuario
    const arrayPermisos = []
  // retorna un middleware
  return (req, res, next) => {
    // Se crea un arreglo nuevo solo con los codigos de los permisos que mantiene el usuario logueado
    req.user.rol.permisos.forEach(element => {
      arrayPermisos.push(element.CODI_PERMISO)
    });
     if (req.user && arrayPermisos.includes(allowed))
       next() // Si el codigo del permiso lo mantiene el usuario pasa al siguiente middleware
     else {
       res.status(403).json({ error: true, data: { message: 'Forbidden' } })
     }
  }
}

export default permit

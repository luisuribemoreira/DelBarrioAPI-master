
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
    // Se declara un Flag para saber si el codigo del permiso lo mantiene el usuario en caso de ser un Arreglo
    var auxMid = false
    // Se pregunta si la variable que viene del metodo es un arreglo o solo un número
    // Se implementa un arreglo ya que varios usuarios pueden ejecutar una ruta pero mantienen cddigo de diferente
    // Por ejemplo el administrador , super administrador y emprendendedor pueden editar informacion
    // de un emprendedor , siendo el caso que el emprendedor solo corresponde a sus datos
    if(Array.isArray(allowed)) {
      // Se recorre el arreglo de codigos de permiso que pueden efectuar la ruta solicitada
      for (let i = 0; i < allowed.length; i++) {
        if(arrayPermisos.includes(allowed[i])) {
          console.log(allowed[i])
          // Si existe la variable el flag cambia a true y se detiene el ciclo for
          auxMid = true
          break;
        }      
      }
      // Si el flag es verdadero se pasa al siguiente middleware
      if (req.user && auxMid) {
        next();
      } else {
        // Si no se prohibe el acceso
        res.status(403).json({ error: true, data: { message: 'Forbidden' } })
      }
    } else if(Number.isInteger(allowed)){
      if (req.user && arrayPermisos.includes(allowed)) {
        next() // Si el codigo del permiso lo mantiene el usuario pasa al siguiente middleware
      } else {
        res.status(403).json({ error: true, data: { message: 'Forbidden' } })
      }
    } else { 
        res.status(403).json({ error: true, data: { message: 'Forbidden' } })

    }

  }
}

export default permit

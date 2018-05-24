exports.seed = function (knex) {
  return knex('SIS_PERMISOS_ROLES').del()
    .then(() => { return knex('SIS_ROLES').del() })
    .then(() => { return knex('SIS_PERMISOS').del() })
    .then(() => {
      return knex('SIS_ROLES').insert([
        {CODI_ROL: 101, NOMB_ROL: 'Cliente'},
        {CODI_ROL: 102, NOMB_ROL: 'Emprendedor'},
        {CODI_ROL: 103, NOMB_ROL: 'Administrador'},
        {CODI_ROL: 104, NOMB_ROL: 'Super Administrador'},
      ])
    })
    .then(() => {
      return knex('SIS_PERMISOS').insert([
        // CODI_PERMISO 1xx : Visualizar
        {CODI_PERMISO: 101, NOMB_PERMISO: 'Ver motivos de denuncia'},
        {CODI_PERMISO: 102, NOMB_PERMISO: 'Ver motivos de deshabilitación'},
        {CODI_PERMISO: 103, NOMB_PERMISO: 'Ver emprendedor (Objeto completo)'},
        {CODI_PERMISO: 104, NOMB_PERMISO: 'Ver comentarios'},
        {CODI_PERMISO: 105, NOMB_PERMISO: 'Ver respuestas'},
        {CODI_PERMISO: 106, NOMB_PERMISO: 'Ver calificaciones'},
        {CODI_PERMISO: 107, NOMB_PERMISO: 'Ver denuncias (por Usuario emisor)'},
        {CODI_PERMISO: 108, NOMB_PERMISO: 'Ver denuncias (por Administrador)'},
        {CODI_PERMISO: 109, NOMB_PERMISO: 'Ver resoluciones de denuncias'},
        {CODI_PERMISO: 110, NOMB_PERMISO: 'Ver deshabilitaciones de cuentas'},
        // CODI_PERMISO 2xx : Administrar
        {CODI_PERMISO: 201, NOMB_PERMISO: 'Administrar categorías'},
        {CODI_PERMISO: 202, NOMB_PERMISO: 'Administrar rubros'},
        {CODI_PERMISO: 203, NOMB_PERMISO: 'Administrar motivos de denuncia'},
        {CODI_PERMISO: 204, NOMB_PERMISO: 'Administrar motivos de deshabilitación'},
        {CODI_PERMISO: 205, NOMB_PERMISO: 'Administrar FAQs'},
        {CODI_PERMISO: 206, NOMB_PERMISO: 'Administrar cuenta Cliente (a si mismo)'},
        {CODI_PERMISO: 207, NOMB_PERMISO: 'Administrar cuenta Emprendedor (a si mismo)'},
        {CODI_PERMISO: 208, NOMB_PERMISO: 'Administrar cuenta Administrador (a si mismo)'},
        {CODI_PERMISO: 209, NOMB_PERMISO: 'Administrar cuentas Cliente (por Administrador)'},
        {CODI_PERMISO: 210, NOMB_PERMISO: 'Administrar cuentas Emprendedor (por Administrador)'},
        {CODI_PERMISO: 211, NOMB_PERMISO: 'Administrar cuentas Administrador (por Super Administrador)'},
        {CODI_PERMISO: 212, NOMB_PERMISO: 'Administrar publicaciones (por Emprendedor emisor)'},
        {CODI_PERMISO: 213, NOMB_PERMISO: 'Administrar publicaciones (por Administrador)'},
        {CODI_PERMISO: 214, NOMB_PERMISO: 'Administrar ofertas'},
        {CODI_PERMISO: 215, NOMB_PERMISO: 'Agregar etiquetas'},
        {CODI_PERMISO: 216, NOMB_PERMISO: 'Agregar comentarios'},
        {CODI_PERMISO: 217, NOMB_PERMISO: 'Agregar respuestas (Emprendedor relacionado)'},
        {CODI_PERMISO: 218, NOMB_PERMISO: 'Banear comentarios'},
        {CODI_PERMISO: 219, NOMB_PERMISO: 'Habilitar/deshabilitar respuestas'},
        {CODI_PERMISO: 220, NOMB_PERMISO: 'Agregar calificaciones'},
        {CODI_PERMISO: 221, NOMB_PERMISO: 'Habilitar/deshabilitar calificaciones'},
        {CODI_PERMISO: 222, NOMB_PERMISO: 'Agregar denuncias'},
        {CODI_PERMISO: 223, NOMB_PERMISO: 'Agregar resoluciones de denuncia'},
        {CODI_PERMISO: 224, NOMB_PERMISO: 'Agregar deshabilitaciones de cuenta'},
        {CODI_PERMISO: 225, NOMB_PERMISO: 'Agregar emprendedor'},
        {CODI_PERMISO: 226, NOMB_PERMISO: 'Administrar imágenes propias'},
        // CODI_PERMISO 3xx : Eliminar
        {CODI_PERMISO: 301, NOMB_PERMISO: 'Eliminar FAQs'},
        {CODI_PERMISO: 302, NOMB_PERMISO: 'Eliminar imágenes'},
        {CODI_PERMISO: 303, NOMB_PERMISO: 'Eliminar teléfonos (a si mismo)'},
      ])
    })
    .then(() => {
      return knex.select('IDEN_PERMISO', 'CODI_PERMISO').from('SIS_PERMISOS')
        .then(permisos => {
          return knex.select('IDEN_ROL', 'CODI_ROL').from('SIS_ROLES')
            .then(roles => {
              return knex('SIS_PERMISOS_ROLES').insert([
                // Clientes - Visualizar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 101).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 102).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 103).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 104).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 105).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 106).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 107).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 109).IDEN_PERMISO},
                // Clientes - Administrar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 206).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 216).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 220).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 222).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 224).IDEN_PERMISO},
                // Clientes - Eliminar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 303).IDEN_PERMISO},
                // Emprendedores - Visualizar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 101).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 102).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 103).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 104).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 105).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 106).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 107).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 109).IDEN_PERMISO},
                // Emprendedores - Administrar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 207).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 212).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 214).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 215).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 217).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 222).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 224).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 226).IDEN_PERMISO},
                // Emprendedores - Eliminar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 302).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 303).IDEN_PERMISO},
                // Administradores - Visualizar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 101).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 102).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 103).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 104).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 105).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 106).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 108).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 109).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 110).IDEN_PERMISO},
                // Administradores - Administrar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 201).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 202).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 203).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 204).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 205).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 208).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 209).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 210).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 213).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 218).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 219).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 221).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 223).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 225).IDEN_PERMISO},
                // Administradores - Eliminar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 301).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 302).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 303).IDEN_PERMISO},
                // Super Administradores - Visualizar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 101).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 102).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 103).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 104).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 105).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 106).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 108).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 109).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 110).IDEN_PERMISO},
                // Super Administradores - Administrar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 201).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 202).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 203).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 204).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 205).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 209).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 210).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 211).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 213).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 218).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 219).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 221).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 223).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 225).IDEN_PERMISO},
                // Super Administradores - Eliminar
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 301).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 302).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 104).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 303).IDEN_PERMISO},
              ])
            })
        })
    })
}

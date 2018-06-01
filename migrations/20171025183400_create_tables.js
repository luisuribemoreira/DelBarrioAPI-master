exports.up = function (knex) {
  return createSisRoles()
    .then(createSisPermisos)
    .then(createSisPermisosRoles)
    .then(createUsrUsuarios)
    .then(createPerTelefonos)
    .then(createPerRubros)
    .then(createPerEmprendedores)
    .then(createPerPersonas)
    .then(createReqCategorias)
    .then(createReqPublicaciones)
    .then(createReqImagenes)
    .then(createReqOfertas)
    .then(createReqEtiquetas)
    .then(createReqPublicacionesEtiquetas)
    .then(createReqComentarios)
    .then(createReqRespuestas)
    .then(createReqCalificaciones)
    .then(createReqMotivosDenuncia)
    .then(createReqDenuncias)
    .then(createReqResolucionDenuncias)
    .then(createReqFaq)
    .then(createReqMotivosDeshabilitacion)
    .then(createReqDeshabilitacionesCuentas)

  function createSisRoles () {
    return knex.schema.createTableIfNotExists('SIS_ROLES', table => {
      table.increments('IDEN_ROL').unsigned().primary()
      table.integer('CODI_ROL').notNull().unique()
      table.string('NOMB_ROL').notNull()
    })
  }

  function createSisPermisos () {
    return knex.schema.createTableIfNotExists('SIS_PERMISOS', table => {
      table.increments('IDEN_PERMISO').unsigned().primary()
      table.integer('CODI_PERMISO').notNull().unique()
      table.string('NOMB_PERMISO').notNull()
    })
  }

  function createSisPermisosRoles () {
    return knex.schema.createTableIfNotExists('SIS_PERMISOS_ROLES', table => {
      table.increments('IDEN_PERMISOS_ROLES').unsigned().primary()
      table.integer('IDEN_PERMISO').unsigned().notNull()
      table.integer('IDEN_ROL').unsigned().notNull()
        
      table.foreign('IDEN_PERMISO').references('SIS_PERMISOS.IDEN_PERMISO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_ROL').references('SIS_ROLES.IDEN_ROL').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createUsrUsuarios () {
    return knex.schema.createTableIfNotExists('USR_USUARIOS', table => {
      table.increments('IDEN_USUARIO').unsigned().primary()
      table.integer('IDEN_ROL').unsigned().notNull()
      table.string('EMAIL_USUARIO').notNull()
      table.string('DESC_PASSWORD').notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
      table.boolean('FLAG_BAN').notNull().defaultTo(false)
    
      table.foreign('IDEN_ROL').references('SIS_ROLES.IDEN_ROL').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerTelefonos () {
    return knex.schema.createTableIfNotExists('PER_TELEFONOS', table => {
      table.increments('IDEN_FONO').unsigned().primary()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.string('NUMR_FONO').notNull()
      table.integer('CODI_FONO').notNull()
    
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerRubros () {
    return knex.schema.createTableIfNotExists('PER_RUBROS', table => {
      table.increments('IDEN_RUBRO').unsigned().primary()
      table.string('NOMB_RUBRO', 100).notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
    })
  }

  function createPerEmprendedores () {
    return knex.schema.createTableIfNotExists('PER_EMPRENDEDORES', table => {
      table.increments('IDEN_EMPRENDEDOR').unsigned().primary()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.integer('IDEN_RUBRO').unsigned()
      table.integer('RUT_EMPRENDEDOR').notNull()
      table.string('DV_EMPRENDEDOR', 1).notNull()
      table.string('DESC_EMPRENDEDOR')
      table.string('DESC_NOMBRE_FANTASIA').notNull()
      table.string('DESC_NOMBRE_EMPRESA').notNull()
      table.boolean('FLAG_VALIDADO').notNull().defaultTo(false)
        
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_RUBRO').references('PER_RUBROS.IDEN_RUBRO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createPerPersonas () {
    return knex.schema.createTableIfNotExists('PER_PERSONAS', table => {
      table.increments('IDEN_PERSONA').unsigned().primary()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.string('NOMBRES').notNull()
      table.string('APELLIDO_PATERNO').notNull()
      table.string('APELLIDO_MATERNO').notNull()
      table.date('FECH_FECHA_NACIMIENTO').notNull()

      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqCategorias () {
    return knex.schema.createTableIfNotExists('REQ_CATEGORIAS', table => {
      table.increments('IDEN_CATEGORIA').unsigned().primary()
      table.integer('IDEN_CATEGORIA_PADRE').unsigned()
      table.string('NOMB_CATEGORIA', 50).notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)

      table.foreign('IDEN_CATEGORIA_PADRE').references('REQ_CATEGORIAS.IDEN_CATEGORIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqPublicaciones () {
    return knex.schema.createTableIfNotExists('REQ_PUBLICACIONES', table => {
      table.increments('IDEN_PUBLICACION').unsigned().primary()
      table.integer('IDEN_EMPRENDEDOR').unsigned().notNull()
      table.integer('IDEN_CATEGORIA').unsigned().notNull()
      table.string('CODI_TIPO_PUBLICACION', 1).notNull()
      table.string('NOMB_PUBLICACION').notNull()
      table.text('DESC_PUBLICACION', 'longtext')
      table.integer('NUMR_PRECIO').unsigned().notNull()
      table.integer('NUMR_CONTADOR').unsigned().notNull().defaultTo(0)
      table.boolean('FLAG_CONTENIDO_ADULTO').notNull().defaultTo(false)
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
      table.boolean('FLAG_VALIDADO').notNull().defaultTo(false)
      table.boolean('FLAG_BAN').notNull().defaultTo(false)
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))

      table.foreign('IDEN_EMPRENDEDOR').references('PER_EMPRENDEDORES.IDEN_EMPRENDEDOR').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_CATEGORIA').references('REQ_CATEGORIAS.IDEN_CATEGORIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqImagenes () {
    return knex.schema.createTableIfNotExists('REQ_IMAGENES', table => {
      table.increments('IDEN_IMAGEN').unsigned().primary()
      table.integer('IDEN_PUBLICACION').unsigned()
      table.integer('IDEN_EMPRENDEDOR').unsigned().unique()
      table.string('URL_IMAGEN').notNull()

      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_EMPRENDEDOR').references('PER_EMPRENDEDORES.IDEN_EMPRENDEDOR').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqOfertas () {
    return knex.schema.createTableIfNotExists('REQ_OFERTAS', table => {
      table.increments('IDEN_OFERTA').unsigned().primary()
      table.integer('IDEN_PUBLICACION').unsigned().unique()
      table.dateTime('FECH_INICIO').notNull()
      table.dateTime('FECH_TERMINO').notNull()
      table.integer('NUMR_PRECIO').unsigned().notNull()

      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqEtiquetas () {
    return knex.schema.createTableIfNotExists('REQ_ETIQUETAS', table => {
      table.increments('IDEN_ETIQUETA').unsigned().primary()
      table.string('NOMB_ETIQUETA').notNull()
    })
  }

  function createReqPublicacionesEtiquetas () {
    return knex.schema.createTableIfNotExists('REQ_PUBLICACIONES_ETIQUETAS', table => {
      table.increments('IDEN_PUBLICACION_ETIQUETA').unsigned().primary()
      table.integer('IDEN_ETIQUETA').unsigned().notNull()
      table.integer('IDEN_PUBLICACION').unsigned().notNull()

      table.foreign('IDEN_ETIQUETA').references('REQ_ETIQUETAS.IDEN_ETIQUETA').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqComentarios () {
    return knex.schema.createTableIfNotExists('REQ_COMENTARIOS', table => {
      table.increments('IDEN_COMENTARIO').unsigned().primary()
      table.integer('IDEN_PUBLICACION').unsigned().notNull()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.string('DESC_COMENTARIO').notNull()
      table.boolean('FLAG_BAN').notNull().defaultTo(false)
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqRespuestas () {
    return knex.schema.createTableIfNotExists('REQ_RESPUESTAS', table => {
      table.increments('IDEN_RESPUESTA').unsigned().primary()
      table.integer('IDEN_COMENTARIO').unsigned().notNull().unique()
      table.string('DESC_RESPUESTA').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_COMENTARIO').references('REQ_COMENTARIOS.IDEN_COMENTARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqCalificaciones () {
    return knex.schema.createTableIfNotExists('REQ_CALIFICACIONES', table => {
      table.increments('IDEN_CALIFICACION').unsigned().primary()
      table.integer('IDEN_PUBLICACION').unsigned().notNull()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.integer('NUMR_VALOR').notNull()
      table.string('DESC_CALIFICACION')
      table.boolean('FLAG_BAN').notNull().defaultTo(false)
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqMotivosDenuncia () {
    return knex.schema.createTableIfNotExists('REQ_MOTIVOS_DENUNCIA', table => {
      table.increments('IDEN_MOTIVO_DENUNCIA').unsigned().primary()
      table.string('NOMB_MOTIVO_DENUNCIA', 100).notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
    })
  }

  function createReqDenuncias () {
    return knex.schema.createTableIfNotExists('REQ_DENUNCIAS', table => {
      table.increments('IDEN_DENUNCIA').unsigned().primary()
      table.integer('IDEN_PUBLICACION').unsigned()
      table.integer('IDEN_CALIFICACION').unsigned()
      table.integer('IDEN_COMENTARIO').unsigned()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.integer('IDEN_MOTIVO_DENUNCIA').unsigned().notNull()
      table.text('DESC_DENUNCIA').notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_PUBLICACION').references('REQ_PUBLICACIONES.IDEN_PUBLICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_CALIFICACION').references('REQ_CALIFICACIONES.IDEN_CALIFICACION').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_COMENTARIO').references('REQ_COMENTARIOS.IDEN_COMENTARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_MOTIVO_DENUNCIA').references('REQ_MOTIVOS_DENUNCIA.IDEN_MOTIVO_DENUNCIA').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqResolucionDenuncias () {
    return knex.schema.createTableIfNotExists('REQ_RESOLUCION_DENUNCIAS', table => {
      table.increments('IDEN_RESOLUCION_DENUNCIA').unsigned().primary()
      table.integer('IDEN_DENUNCIA').unsigned().notNull()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.string('DESC_RESOLUCION').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))
      
      table.foreign('IDEN_DENUNCIA').references('REQ_DENUNCIAS.IDEN_DENUNCIA').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }

  function createReqFaq () {
    return knex.schema.createTableIfNotExists('REQ_FAQ', table => {
      table.increments('IDEN_FAQ').unsigned().primary()
      table.string('NOMB_FAQ', 255).notNull()
      table.text('DESC_FAQ', 1000).notNull()
    })
  }

  function createReqMotivosDeshabilitacion () {
    return knex.schema.createTableIfNotExists('REQ_MOTIVOS_DESHABILITACION', table => {
      table.increments('IDEN_MOTIVO_DESHABILITACION').unsigned().primary()
      table.string('NOMB_MOTIVO_DESHABILITACION', 100).notNull()
      table.boolean('FLAG_VIGENTE').notNull().defaultTo(true)
    })
  }

  function createReqDeshabilitacionesCuentas () {
    return knex.schema.createTableIfNotExists('REQ_DESHABILITACION_CUENTAS', table => {
      table.increments('IDEN_DESHABILITACION_CUENTA').unsigned().primary()
      table.integer('IDEN_USUARIO').unsigned().notNull()
      table.integer('IDEN_MOTIVO_DESHABILITACION').unsigned().notNull()
      table.string('DESC_COMENTARIO').notNull()
      table.dateTime('FECH_CREACION').notNull().defaultTo(knex.raw('now()'))

      table.foreign('IDEN_USUARIO').references('USR_USUARIOS.IDEN_USUARIO').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('IDEN_MOTIVO_DESHABILITACION').references('REQ_MOTIVOS_DESHABILITACION.IDEN_MOTIVO_DESHABILITACION').onDelete('CASCADE').onUpdate('CASCADE')
    })
  }
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('REQ_DESHABILITACION_CUENTAS')
    .dropTableIfExists('REQ_MOTIVOS_DESHABILITACION')
    .dropTableIfExists('REQ_FAQ')
    .dropTableIfExists('REQ_RESOLUCION_DENUNCIAS')
    .dropTableIfExists('REQ_DENUNCIAS')
    .dropTableIfExists('REQ_MOTIVOS_DENUNCIA')
    .dropTableIfExists('REQ_CALIFICACIONES')
    .dropTableIfExists('REQ_RESPUESTAS')
    .dropTableIfExists('REQ_COMENTARIOS')
    .dropTableIfExists('REQ_PUBLICACIONES_ETIQUETAS')
    .dropTableIfExists('REQ_ETIQUETAS')
    .dropTableIfExists('REQ_OFERTAS')
    .dropTableIfExists('REQ_IMAGENES')
    .dropTableIfExists('REQ_PUBLICACIONES')
    .dropTableIfExists('REQ_CATEGORIAS')
    .dropTableIfExists('PER_PERSONAS')
    .dropTableIfExists('PER_EMPRENDEDORES')
    .dropTableIfExists('PER_RUBROS')
    .dropTableIfExists('PER_TELEFONOS')
    .dropTableIfExists('USR_USUARIOS')
    .dropTableIfExists('SIS_PERMISOS_ROLES')
    .dropTableIfExists('SIS_PERMISOS')
    .dropTableIfExists('SIS_ROLES')
}

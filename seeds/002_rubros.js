exports.seed = function (knex) {
  return knex('PER_RUBROS').del()
    .then(() => {
      return knex('PER_RUBROS').insert([
        {NOMB_RUBRO: 'Agricultura, Ganadería, Caza y Silvicultura'},
        {NOMB_RUBRO: 'Pesca'},
        {NOMB_RUBRO: 'Explotación de Minas y Canteras'},
        {NOMB_RUBRO: 'Industrias Manufactureras No Metálicas'},
        {NOMB_RUBRO: 'Industrias Manufactureras Metálicas'},
        {NOMB_RUBRO: 'Suministro de Electricidad, Gas y Agua'},
        {NOMB_RUBRO: 'Construcción'},
        {NOMB_RUBRO: 'Comercio al por Mayor y Menor, Rep. Veh. Automotores / Enseres Domésticos'},
        {NOMB_RUBRO: 'Hoteles y Restaurantes'},
        {NOMB_RUBRO: 'Transporte, Almacenamiento y Comunicaciones'},
        {NOMB_RUBRO: 'Intermediación Financiera'},
        {NOMB_RUBRO: 'Actividades Inmobiliarias, Empresariales y de Alquiler'},
        {NOMB_RUBRO: 'Adm. Pública y Defensa, Planes de Seg. Social Afiliación Obligatoria'},
        {NOMB_RUBRO: 'Enseñanza'},
        {NOMB_RUBRO: 'Servicios Sociales y de Salud'},
        {NOMB_RUBRO: 'Otras Actividades de Servicios Comunitarias, Sociales y Personales'},
        {NOMB_RUBRO: 'Consejo De Administración de Edificios y Condominios'},
        {NOMB_RUBRO: 'Organizaciones Y Órganos Extraterritoriales'},
        {NOMB_RUBRO: 'Sin Información'}
      ])
    })
}

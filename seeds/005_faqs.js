exports.seed = function (knex) {
  return knex('REQ_FAQ').del()
    .then(() => {
      return knex('REQ_FAQ').insert([
        {NOMB_FAQ: '¿Cómo puedo autenticar?', DESC_FAQ: 'Debes dirigirte a X, luego ingresar tu correo electrónico y contraseña.'},
        {NOMB_FAQ: '¿Puedo registrarme como emprendedor?', DESC_FAQ: 'Si, pero no a través de este sitio. Dirígete a Infante 1415 para obtener más información.'},
        {NOMB_FAQ: '¿Me pueden estafar?', DESC_FAQ: 'No existen transacciones monetarias a través de este sitio. Procura revisar las calificaciones de los emprendedores.'},
        {NOMB_FAQ: '¿Cual es el significado de la vida?', DESC_FAQ: 'Comer.'},
      ])
    })
}

exports.seed = function (knex) {
  return knex('REQ_CATEGORIAS').del()
    .then(() => {
      return knex('REQ_CATEGORIAS').insert([
        {NOMB_CATEGORIA: 'Computación y Electrónica'},
        {NOMB_CATEGORIA: 'Vida sana', FLAG_VIGENTE: false},
        {NOMB_CATEGORIA: 'Comida'},
        {NOMB_CATEGORIA: 'Vestimenta', FLAG_VIGENTE: false}
      ])
    })
    .then(() => {
      return knex.select('IDEN_CATEGORIA', 'NOMB_CATEGORIA').from('REQ_CATEGORIAS')
        .then(categorias => {
          return knex('REQ_CATEGORIAS').insert([
            {NOMB_CATEGORIA: 'Completos', IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Comida').IDEN_CATEGORIA},
            {NOMB_CATEGORIA: 'Pizzas', FLAG_VIGENTE: false, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Comida').IDEN_CATEGORIA},

            {NOMB_CATEGORIA: 'Zapatos', IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Vestimenta').IDEN_CATEGORIA},
            {NOMB_CATEGORIA: 'Poleras', FLAG_VIGENTE: false, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Vestimenta').IDEN_CATEGORIA},            
          ])
        })
    })
}

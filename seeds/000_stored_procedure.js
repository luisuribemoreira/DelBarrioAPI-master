exports.seed = function (knex) {
  return knex.raw('DROP FUNCTION IF EXISTS search_posts(character varying);')
    .then(() => {
      return knex.raw(`CREATE OR REPLACE FUNCTION search_posts(que VARCHAR(255))
      RETURNS TABLE ( "IDEN_PUBLICACION" INTEGER ) AS $$
      BEGIN
        RETURN QUERY 
          SELECT pub."IDEN_PUBLICACION"
          FROM "REQ_PUBLICACIONES" pub LEFT JOIN "REQ_PUBLICACIONES_ETIQUETAS" pivot
          ON pub."IDEN_PUBLICACION" = pivot."IDEN_PUBLICACION"
          LEFT JOIN "REQ_ETIQUETAS" eti
          ON pivot."IDEN_ETIQUETA" = eti."IDEN_ETIQUETA"
          WHERE LOWER(pub."NOMB_PUBLICACION" || ' ' || COALESCE(pub."DESC_PUBLICACION", '') || ' ' || COALESCE(eti."NOMB_ETIQUETA", '')) SIMILAR TO '%' || REPLACE(REPLACE(LOWER(que), '  ', ' '), ' ', '%|') || '%'
          GROUP BY pub."IDEN_PUBLICACION" ORDER BY COUNT(*);
      END;
      $$ LANGUAGE plpgsql;`)
        .then(() => {
          return knex.raw('CREATE INDEX ON "REQ_PUBLICACIONES" ("IDEN_PUBLICACION", "NOMB_PUBLICACION", "DESC_PUBLICACION");')
        })
    })
}

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      port : '5432',
      user : 'root',
      password : '1234',
      database : 'delbarrio'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host : 'localhost',
      port : '5432',
      user : 'root',
      password : '1234',
      database : 'delbarrio'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : process.env.POSTGRES_HOST,
      port : process.env.POSTGRES_PORT,
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
}

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  };
} else {
  config = {
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'react-store',
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);


pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

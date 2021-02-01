const { Pool } = require('pg');
const fs = require('fs');

class PgConnectionProvider {
    createPgConnection() {
        const pool = new Pool({
            host: 'db-postgresql-fra1-44276-do-user-8641935-0.b.db.ondigitalocean.com',
            user: 'doadmin',
            database: 'defaultdb',
            password: 'x6gvv47s8u4z8fyl',
            port: 25060,
            ssl: {
                rejectUnauthorized: false,
                ca: fs.readFileSync('./ca-certificate.crt').toString(),
            }
        });
        return pool;
    }
}

module.exports = PgConnectionProvider;
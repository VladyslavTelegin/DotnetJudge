const { Client } = require('pg');
const fs = require('fs');
const cache = require('memory-cache');
const CACHE_KEY = "quizes";

class QuizStorageProvider {
    
    async getByQuizNumber(quizNumber) {

        if (!cache.get(CACHE_KEY)) {
            let client = new Client({
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

            client.connect();
            const quizes = (await client.query(`SELECT * FROM "Quizes"`)).rows;
            cache.put(CACHE_KEY, quizes);
        }   

        const cachedQuizes = cache.get(CACHE_KEY);
        return cachedQuizes.filter(quiz => quiz.Number == parseInt(quizNumber))[0];
    }

    invalidateCache() {
        cache.del(CACHE_KEY);
    }
}

module.exports = QuizStorageProvider;
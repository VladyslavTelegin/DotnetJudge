const cache = require('memory-cache');
const PgConnectionProvider = require('./pg-connection-provider.js');
const CACHE_KEY = "quizes";

class QuizStorageProvider extends PgConnectionProvider {
    
    async getAllQuizes() {

        if (!cache.get(CACHE_KEY)) {        
            const quizes = (await (super.createPgConnection()).query(`SELECT * FROM "Quizes"`)).rows;
            cache.put(CACHE_KEY, quizes);
        }   

        const cachedQuizes = cache.get(CACHE_KEY);
        return cachedQuizes.map(quiz => Object.assign({}, quiz));
    }

    async getByQuizNumber(quizNumber) {

        if (!cache.get(CACHE_KEY)) {        
            const quizes = (await (super.createPgConnection()).query(`SELECT * FROM "Quizes"`)).rows;
            cache.put(CACHE_KEY, quizes);
        }   

        const cachedQuizes = cache.get(CACHE_KEY);
        const quiz = cachedQuizes.filter(quiz => quiz.Number == parseInt(quizNumber))[0];
        return Object.assign({}, quiz);
    }

    invalidateCache() {
        cache.del(CACHE_KEY);
    }
}

module.exports = QuizStorageProvider;
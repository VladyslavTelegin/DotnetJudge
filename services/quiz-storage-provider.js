const cache = require('memory-cache');
const PgConnectionProvider = require('./pg-connection-provider.js');
const appConfig = require('../config.js');
const CACHE_KEY = "quizes";
const axios = require('axios');
const logger = require('node-file-logger');

class QuizStorageProvider extends PgConnectionProvider {
    
    async getAllQuizes() {

        if (!cache.get(CACHE_KEY)) {        
            const quizes = (await (super.createPgConnection()).query(`SELECT * FROM "Quizes"`)).rows;
            cache.put(CACHE_KEY, quizes);
        }   

        const cachedQuizes = cache.get(CACHE_KEY);
        return cachedQuizes.map(quiz => Object.assign({}, quiz)).sort((a, b) => a.Number - b.Number);
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

    async invalidateCache(isDistributed) {      
        cache.del(CACHE_KEY);
        if (!isDistributed) {
            for (var i = 0; i < appConfig.instancesCount * 2; i++) {
                await axios.get(`${appConfig.host}/quiz/invalidate-cache?isDistributed=true`).catch(e => {
                    logger.Error({
                        errorMessage: 'Unable to invalidate cache in distributed mode.',
                        serviceName: 'QuizStorageProvider',
                        methodName: 'InvalidateCache',
                        error: e
                    });
                });
            }
        }
    }
}

module.exports = QuizStorageProvider;
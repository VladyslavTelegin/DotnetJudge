const PgConnectionProvider = require('./pg-connection-provider.js');
const passwordHash = require('password-hash');
const cache = require('memory-cache');
const CACHE_KEY = "applications";
const GET_APPLICATIONS_QUERY = `SELECT * FROM "Applications"`;

class AuthService extends PgConnectionProvider {
    async verifyApplication(applicationId, password, ipV4) {
        const application = await this.getApplicationById(applicationId);
        if (application !== null) {
            let result = passwordHash.verify(password, application.PasswordHash);
            if (!application.IgnoreIPv4Verification) {
                result &&= application.IPv4.trimStart().trimEnd() === ipV4;
            }
        } else {
            return false;
        }
    }

    async getApplicationById(applicationId) {
        const cachedApplications = await this._getAppsFromCache();
        const filteredApplications = cachedApplications.filter(application => application.ApplicationId === applicationId);
        return filteredApplications.length === 1 ? filteredApplications[0] : null;
    }

    invalidateCache() {
        cache.del(CACHE_KEY);
    }

    async _getAppsFromCache() {
        if (!cache.get(CACHE_KEY)) {        
            const applications = (await (super.createPgConnection()).query(GET_APPLICATIONS_QUERY)).rows;
            cache.put(CACHE_KEY, applications);
        }   
        return cache.get(CACHE_KEY);
    }
}

module.exports = AuthService;
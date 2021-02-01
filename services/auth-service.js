const PgClientProvider = require('./pg-connection-provider.js');
const passwordHash = require('password-hash');
const GET_APPLICATION_BY_ID_QUERY = `SELECT * FROM "Applications" WHERE "ApplicationId" = '{applicationId}'`;

class AuthService extends PgClientProvider {
    async verifyApplication(applicationId, password, ipV4) {
        const applications =
            (await (super.createPgConnection()).query(GET_APPLICATION_BY_ID_QUERY.replace("{applicationId}", applicationId))).rows;
        if (applications.length === 1) {
            const application = applications[0];
            return passwordHash.verify(password, application.PasswordHash) && application.IPv4 === ipV4;
        } else {
            return false;
        }
    }

    async getApplicationById(applicationId) {
        const applications =
            (await (super.createPgConnection()).query(GET_APPLICATION_BY_ID_QUERY.replace("{applicationId}", applicationId))).rows
        return applications.length === 1 ? applications[0] : null;
    }
}

module.exports = AuthService;
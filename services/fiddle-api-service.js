const axios = require('axios')
const FIDDLE_URI = 'https://dotnetfiddle.net/home/run';

class FiddleApiService {
    post(codeBlock) {
        return axios.post(FIDDLE_URI, {
            CodeBlock: codeBlock,
            Language: 'CSharp',
            Compiler: 'Roslyn',
            ProjectType: 'Console',
            NuGetPackageVersionIds: '47080',
            UseResultCache: true
        }).catch(error => {
            console.error(error)
        });
    }
}

module.exports = FiddleApiService;
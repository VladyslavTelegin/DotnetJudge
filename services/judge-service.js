const FiddleApiService = require('./fiddle-api-service.js');
const QuizStorageProvider = require('./quiz-storage-provider.js');

const CODE_EXECUTOR_FRAGMENT = 
    "public static void Main() { foreach (var inputData in {inputDataCollection}) { var result = {callMethodName}(inputData); {consoleOutputFragment}; }}";

class JudgeService {
    constructor() {
        this._fiddleApiService = new FiddleApiService();
        this._quizStorageProvider = new QuizStorageProvider();
    }

    async check(request) {

        var quizData = await this._quizStorageProvider.getByQuizNumber(request.quizNumber);

        var wrappedCodeBlock = this._wrapCodeBlock(request.code, quizData);
        var response = (await this._fiddleApiService.post(wrappedCodeBlock)).data;
        
        var output = response.ConsoleOutput;

        var errors = output.includes('error') ? output : null;
        if (errors === null) {
            if (output !== '') {
                var splittedOutput = output.split('\r\n');
                var expectedOutputsJson = JSON.parse(quizData.ExpectedOutputs);
                for (var i = 0; i < expectedOutputsJson.length; i++) {
                    if (expectedOutputsJson[i] !== splittedOutput[i]) {
                        errors = "Wrong. Some tests not passed.";
                        break;
                    }
                }
               
                output = "Success. All tests passed. Good luck!";
            }    
        }

        var stats = response.Stats
        delete stats.IsResultCache;

        return {
            QuizNumber: request.quizNumber,
            Output: output, 
            Errors: errors,
            Stats: stats
        };
    }

    _wrapCodeBlock(rawCodeBlock, quizData)
    {
        rawCodeBlock = rawCodeBlock.trimEnd();
        
        let codeExecutor = CODE_EXECUTOR_FRAGMENT
            .replace('{inputDataCollection}', quizData.InputData)
            .replace('{callMethodName}', quizData.CallMethodName);

        if (!quizData.OutputType.includes('[]')) {
            codeExecutor = codeExecutor.replace('{consoleOutputFragment}', 'Console.WriteLine(result)');
        } else {
            codeExecutor = codeExecutor.replace('{consoleOutputFragment}', 'Console.WriteLine(string.Join(", ", result))');
        }

        const lastClosingBracePosition = rawCodeBlock.length - 1;
        return [rawCodeBlock.slice(0, lastClosingBracePosition), codeExecutor, rawCodeBlock.slice(lastClosingBracePosition)].join('');
    }
}

module.exports = JudgeService;
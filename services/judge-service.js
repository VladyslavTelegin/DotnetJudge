const FiddleApiService = require('./fiddle-api-service.js');
const QuizStorageProvider = require('./quiz-storage-provider.js');
const logger = require('node-file-logger');

const CODE_EXECUTOR_FRAGMENT = 
    "public static void Main() { foreach (var inputData in {inputDataCollection}) { var result = {callMethodName}(inputData); {consoleOutputFragment}; }}";

class JudgeService {
    constructor() {
        this._fiddleApiService = new FiddleApiService();
        this._quizStorageProvider = new QuizStorageProvider();
    }

    async check(request) {
        
        // Clear multiline comments.
        request.code = request.code.replace(/^\/\*[\s\S]+\*\/$/gmi, '');

        const quizData = await this._quizStorageProvider.getByQuizNumber(request.quizNumber);
        if (quizData.JsCheckingFunction) {
            
            const extractedFunc = eval(quizData.JsCheckingFunction);
            const error = extractedFunc(request.code);
            
            if (error) {           
                const wrappedError = {
                    Output: null, 
                    Error: error,
                    IsPassed: false,
                    IsClrError: false,
                    ClrStats: {}
                };

                logger.Info({
                    serviceName: 'JudgeService',
                    methodName: 'JsCheck',
                    context: {
                        userId: request.userId,
                        applicationId: request.application,
                        quizNumber: request.quizNumber,
                        judgedCode: request.code,
                        judgeVerdict: wrappedError
                    }
                });

                return wrappedError;
            }
        }

        var wrappedCodeBlock = this._wrapCodeBlock(request.code, quizData);
        var response = (await this._fiddleApiService.post(wrappedCodeBlock)).data;
        
        var output = response.ConsoleOutput;

        const isClrError = output.includes('error');

        let errors = isClrError ? output : null;
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
        } else {
            output = null;
        }

        var stats = response.Stats
        delete stats.IsResultCache;

        const trim = (inputString) => inputString ? inputString.trimStart().trimEnd() : inputString;

        const result = {
            Output: trim(output), 
            Error: trim(errors),
            IsPassed: errors === null,
            IsClrError: isClrError,
            ClrStats: stats
        };

        logger.Info({
            serviceName: 'JudgeService',
            methodName: 'DotnetCheck',
            context: {
                userId: request.userId,
                applicationId: request.application,
                quizNumber: request.quizNumber,
                judgeVerdict: result
            }
        });

        return result;
    }

    _wrapCodeBlock(rawCodeBlock, quizData)
    {
        rawCodeBlock = rawCodeBlock.trimEnd();
        
        let codeExecutor = CODE_EXECUTOR_FRAGMENT
            .replace('{callMethodName}', quizData.CallMethodName)
            .replace('{inputDataCollection}', quizData.InputData);

        if (quizData.InputType.includes('<') && quizData.InputType.includes('>')) {
            const typesArray = quizData.InputType.replace('<', '').replace('>', '').split(', ');
            
            let castingString = '(';
            
            for (let i = 0; i < typesArray.length; i++) {
                castingString += `(${typesArray[i]}) inputData[${i}]`;
                if (i < typesArray.length - 1) {
                    castingString += ', ';
                } else {
                    castingString += ');';
                }
            }
            
            codeExecutor = codeExecutor.replace('(inputData);', castingString);
        }

        if (!quizData.OutputType.includes('[]')) {
            if (quizData.OutputType.includes('(') && quizData.OutputType.includes(')')) {
                codeExecutor = codeExecutor.replace('{consoleOutputFragment}', "Console.WriteLine(result.ToString().Trim('(', ')'))");
            } else {
                codeExecutor = codeExecutor.replace('{consoleOutputFragment}', 'Console.WriteLine(result)');
            } 
        } else {
            codeExecutor = codeExecutor.replace('{consoleOutputFragment}', 'Console.WriteLine(string.Join(", ", result))');
        }

        const lastClosingBracePosition = rawCodeBlock.length - 1;
        return [rawCodeBlock.slice(0, lastClosingBracePosition), codeExecutor, rawCodeBlock.slice(lastClosingBracePosition)].join('');
    }
}

module.exports = JudgeService;
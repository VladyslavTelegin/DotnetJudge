const FiddleApiService = require('../services/fiddle-api-service.js');
const TaskDataStorage = require('../services/task-data-storage.js');

const CODE_EXECUTOR_FRAGMENT = 
    "public static void Main() { foreach (var inputData in {inputDataCollection}) { {callMethodName}(inputData); }}";

class DotnetJudgeService {
    constructor() {
        this._fiddleApiService = new FiddleApiService();
        this._taskDataStorage = new TaskDataStorage();
    }

    async check(request) {

        var taskData = this._taskDataStorage.getByTaskId(request.taskId);

        var wrappedCodeBlock = this._wrapCodeBlock(request.code, taskData);
        var response = (await this._fiddleApiService.post(wrappedCodeBlock)).data;
        
        var output = response.ConsoleOutput;

        var errors = output.includes('error') ? output : null;
        if (errors === null) {
            if (output !== '') {
                var splittedOutput = output.split('\r\n');
                for (var i = 0; i < taskData.expectedOutputs.length; i++) {
                    if (taskData.expectedOutputs[i] !== splittedOutput[i]) {
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
            TaskId: request.taskId,
            Output: output, 
            Errors: errors,
            Stats: stats
        };
    }

    _wrapCodeBlock(rawCodeBlock, taskData)
    {
        rawCodeBlock = rawCodeBlock.trimEnd();
        
        const codeExecutor = CODE_EXECUTOR_FRAGMENT
            .replace('{inputDataCollection}', taskData.inputData)
            .replace('{callMethodName}', taskData.requiredMethodName);

        const lastClosingBracePosition = rawCodeBlock.length - 1;
        return [rawCodeBlock.slice(0, lastClosingBracePosition), codeExecutor, rawCodeBlock.slice(lastClosingBracePosition)].join('');
    }
}

module.exports = DotnetJudgeService;
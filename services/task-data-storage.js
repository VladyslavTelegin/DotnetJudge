const TASK_DATA = {
    1: {
        requiredMethodName: 'Split',
        inputData: `new string[] { "abcd", "abc" }`,
        expectedOutputs: [ "ab, cd", "ab, c_" ]
    }
};

class TaskDataStorage {
    getByTaskId(taskId) {
        return TASK_DATA[taskId]
    }
}

module.exports = TaskDataStorage;
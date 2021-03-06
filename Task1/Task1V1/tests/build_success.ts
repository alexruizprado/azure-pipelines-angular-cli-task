import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('command', 'build');
tmr.setInput('debug', 'true');
tmr.setInput('verbose', 'true');
tmr.setInput('project', ``);


tmr.run();
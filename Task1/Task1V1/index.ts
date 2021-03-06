import tl = require('azure-pipelines-task-lib/task');
import { exec, ExecException, spawn } from 'child_process';

import { AnalyticsService } from './services'

interface CommandOutput {
  stdout: string;
  stderr?: string;
  error?: ExecException;
}

//this function will check if @angular/cli is available
async function validateNg(folder: string, onSuccess: Function, onError: Function) {
  let version: any = null;

  let child = spawn('npx', ['ng', 'version'], {
    cwd: folder,
    shell: true
  });

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
    const versionRegex = /Angular CLI: (\d+.\d+.\d+)/;
    let m;
    if ((m = versionRegex.exec(data.toString())) !== null) {
      // The result can be accessed through the `m`-variable.
      console.log(`Using Angular CLI ${m[1]}`);
      version = m[1];
    }
  });

  child.stderr.on('data', function (data) {
    console.error('stderr', data);
    console.error(`exec error: ${data}`);
    console.error(`Angular CLI NOT found`);
    onError();
  });

  child.on('close', function (code) {
    if (code == 1) {
      tl.setResult(tl.TaskResult.Failed, `npx ng version returned error code ${code}`);
      onError();
    } else {
      onSuccess(version);
    }

  });

}

function execute(command: string, args: string, cwd: string, onSuccess: Function, onError: Function) {
  let child = spawn(command, [args], {
    cwd: cwd,
    shell: true
  });

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
    console.log(data);
  });

  child.stderr.on('data', function (data) {
    onError(data);
  });

  child.on('close', function (code) {
    onSuccess(code);
  });
}

async function run() {
  const analyticsDisabled: boolean = tl.getBoolInput('DisableAnalytics', false);
  const telemetry = new AnalyticsService('##{InstrumentationKey}##', analyticsDisabled);
  try {
    const command: string | undefined = tl.getInput('command', true);
    const project: string | undefined = tl.getInput('project', false) || '.';
    const custom: string | undefined = tl.getInput('custom', false);
    let args: string | undefined = tl.getInput('arguments', false) || '';
    const debug: boolean = tl.getBoolInput('debug', false);
    const verbose: boolean = tl.getBoolInput('verbose', false);
    const isProd: boolean = tl.getBoolInput('prod', false);

    telemetry.extendProperties({
      'command': command ? command.toString() : '',
      'debug': debug ? debug.toString() : '',
      'verbose': verbose ? verbose.toString() : '',
      'isProd': isProd ? isProd.toString() : ''
    });

    if (command == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad command was given');
      return;
    }

    if (verbose) {
      if (command === 'build' && args.indexOf('--verbose') === -1) {
        let argsArray = args.split(' ');
        argsArray.push('--verbose');
        args = argsArray.join(' ');
      }
    }

    if (command === 'test' && args.indexOf('--watch') === -1) {
      let argsArray = args.split(' ');
      argsArray.push('--watch=false');
      args = argsArray.join(' ');
    } else if (command == 'build' && isProd && args.indexOf('--prod') === -1) {
      let argsArray = args.split(' ');
      argsArray.push('--prod');
      args = argsArray.join(' ');
    }

    if (debug) {
      console.log(custom || command, project, args, debug, verbose);
    }

    validateNg(project, (version: any) => {
      console.log(`Executing ng ${custom || command} ${args}`);
      //telemetry.trackEvent(`Executing ng ${custom || command} ${args}`);
      execute(`npx`, `ng ${custom || command} ${args}`, project, (code: any) => {
        if (code !== 0) {
          tl.setResult(tl.TaskResult.Failed, `ng ${custom || command} ${args} returned exit code ${code}`);
          telemetry.trackException(new Error(`Executed ng ${custom || command} ${args} with exit code ${code}`));
        } else {
          telemetry.trackEvent(`Successful execution`);
        }
      }, (stderror: string) => {
        console.error(stderror?.toString());
        telemetry.trackException(new Error(stderror));
      });
    }, () => {
      const message = 'Angular CLI was not found.\nRemember to perform "npm install" before using the steps of the Angular CLI extension.\nAngular CLI extensions uses @angular/cli package located in the node_modules folder of an Angular application.\nIf you still have issue or doubts you can open a ticket in https://github.com/alexruizprado/azure-pipelines-angular-cli-task under Issues.';
      telemetry.trackException(new Error('Angular CLI not found.'));
      console.error(message);
      tl.setResult(tl.TaskResult.Failed, message);
      return;
    });
  }
  catch (err) {
    telemetry.trackException(err.message);
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
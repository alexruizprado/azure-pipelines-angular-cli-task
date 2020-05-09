import { exec, ExecException, spawn } from 'child_process';

let child = spawn('npx', ['ng version'], {
  cwd: '.',
  shell: true
});

child.stdout.setEncoding('utf8');

child.stdout.on('data', function (data) {
  console.log(data);
  const versionRegex = /Angular CLI: (\d+.\d+.\d+)/;
  let m;
  if ((m = versionRegex.exec(data.toString())) !== null) {
    // The result can be accessed through the `m`-variable.
    console.log(`Using Angular CLI ${m[1]}`);
  }
});

child.stderr.on('data', function (data) {
  console.error('stderr', data);
  console.error(`exec error: ${data}`);
  console.error(`Angular CLI NOT found`);
});

child.on('close', function (code) {
  if (code == 1) {
    console.error('exit error');
  } else {
    console.log('exit ok!');
  }

});
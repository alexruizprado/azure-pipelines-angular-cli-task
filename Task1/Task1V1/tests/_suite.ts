import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Sample task tests', function () {

  before(function () {

  });

  after(() => {

  });

  it('should succeed with build', function (done: MochaDone) {
    this.timeout(60000);

    let tp = path.join(__dirname, 'build_success.ts');
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, true, 'should have succeeded');
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    console.log(tr.stdout);
    done();
  });

  // it('should succeed with test', function(done: MochaDone) {
  //     this.timeout(60000);

  //     let tp = path.join(__dirname, 'test_success.js');
  //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

  //     tr.run();
  //     assert.equal(tr.succeeded, true, 'should have succeeded');
  //     assert.equal(tr.warningIssues.length, 0, "should have no warnings");
  //     assert.equal(tr.errorIssues.length, 0, "should have no errors");
  //     console.log(tr.stdout);
  //     done();
  // });

  // it('should succeed with lint', function(done: MochaDone) {
  //     this.timeout(60000);

  //     let tp = path.join(__dirname, 'lint_success.js');
  //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

  //     tr.run();
  //     assert.equal(tr.succeeded, true, 'should have succeeded');
  //     assert.equal(tr.warningIssues.length, 0, "should have no warnings");
  //     assert.equal(tr.errorIssues.length, 0, "should have no errors");
  //     console.log(tr.stdout);
  //     done();
  // });

  // it('should succeed with e2e', function(done: MochaDone) {
  //     this.timeout(60000);

  //     let tp = path.join(__dirname, 'e2e_success.js');
  //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

  //     tr.run();
  //     assert.equal(tr.succeeded, true, 'should have succeeded');
  //     assert.equal(tr.warningIssues.length, 0, "should have no warnings");
  //     assert.equal(tr.errorIssues.length, 0, "should have no errors");
  //     console.log(tr.stdout);
  //     done();
  // });

  it('should succeed with custom', function (done: MochaDone) {
    this.timeout(15000);

    let tp = path.join(__dirname, 'custom_success.ts');
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, true, 'should have succeeded');
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    console.log(tr.stdout);
    done();
  });

  // it('it should fail if tool returns 1', function (done: MochaDone) {
  //   this.timeout(15000);

  //   let tp = path.join(__dirname, 'failure.js');
  //   let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

  //   tr.run();
  //   assert.equal(tr.succeeded, false, 'should have failed');
  //   assert.equal(tr.warningIssues, 0, "should have no warnings");
  //   assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
  //   assert.equal(tr.errorIssues[0], 'Bad command was given', 'error issue output');
  //   done();
  // });
});
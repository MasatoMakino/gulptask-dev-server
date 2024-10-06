const test = require("node:test");
const assert = require("assert");
const exec = require("node:child_process").exec;

test("CLI help command should execute successfully", async () => {
  await new Promise((resolve, reject) => {
    exec("node bin/CLI.js --help", (error, stdout, stderr) => {
      try {
        assert.strictEqual(error, null);
        assert.strictEqual(stderr, "");
        assert(stdout.includes("Usage:"));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
});


test("gulptask-dev-server command should start server and wait", async () => {
  await new Promise((resolve, reject) => {
    const process = exec(
      "node bin/CLI.js --base sample",
      (error, stdout, stderr) => {
        try {
          assert.strictEqual(stderr, "");
          assert(stdout.includes("Serving files from:"));
          resolve();
        } catch (err) {
          reject(err);
        }
      },
    );

    //3秒後にプロセスをkillする。それまでにエラーが出なければ成功
    setTimeout(() => {
      process.kill();
    }, 3_000);
  });
});
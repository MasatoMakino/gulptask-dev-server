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

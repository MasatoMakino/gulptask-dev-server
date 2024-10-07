import test from "node:test";
import assert, { strictEqual } from "assert";
import { spawn, exec } from "node:child_process";

test("CLI help command should execute successfully", async () => {
  await new Promise((resolve, reject) => {
    exec("node bin/CLI.js --help", (error, stdout, stderr) => {
      try {
        strictEqual(error, null);
        strictEqual(stderr, "");
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
    const process = spawn("node", ["bin/CLI.js", "--base", "sample"]);

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data.toString();
      if (stdout.includes("Serving files from:")) {
        try {
          strictEqual(stderr, "");
          assert(stdout.includes("Serving files from:"));
          process.kill(); // プロセスを終了
          clearTimeout(timeioutID); // タイムアウトをクリア
          resolve();
        } catch (err) {
          process.kill();
          clearTimeout(timeioutID); // タイムアウトをクリア
          reject(err);
        }
      }
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // タイムアウトを設定して、サーバーが起動するのを待つ
    const timeioutID = setTimeout(() => {
      if (!stdout.includes("Serving files from:")) {
        process.kill();
        reject(new Error("Server did not start in time"));
      }
    }, 10000); // タイムアウトを10秒に延長
  });
});

import { exec } from "child_process";
import { ServerGenerationOption } from "./ServerOption.js";

/**
 * optionに従い、PHPサーバーかbrowserSyncのいずれかを起動する。
 * @param browserSync
 * @param option
 */
export async function startServer(browserSync, option: ServerGenerationOption) {
  if (option.usePhpDevServer) {
    await startPhpServer(browserSync, option);
  } else {
    await startBSServer(browserSync, option);
  }
}

/**
 * PHPサーバーを立ち上げる。
 * @param browserSync
 * @param option
 */
function startPhpServer(
  browserSync,
  option: ServerGenerationOption
): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(
      `php -S 127.0.0.1:${option.phpPort} -t ${option.base}`,
      () => {}
    );
    process.stderr.on("data", (chunk) => {
      const isStartedMessage = /\)\sstarted$/.test(chunk.trim());
      if (isStartedMessage) {
        browserSync.init(
          {
            proxy: {
              target: "localhost:" + option.phpPort,
            },
            port: option.browserSyncPort,
          },
          () => {
            resolve();
          }
        );
      }

      const failMessage = /Failed\s+to\s+listen\s+on/.test(chunk.trim());
      if (failMessage) {
        console.warn(chunk.trim());
        reject();
      }

      console.log(chunk.trim());
    });
  });
}

function startBSServer(
  browserSync,
  option: ServerGenerationOption
): Promise<void> {
  return new Promise((resolve) => {
    browserSync.init(
      {
        server: option.base,
        port: option.browserSyncPort,
      },
      () => {
        resolve();
      }
    );
  });
}

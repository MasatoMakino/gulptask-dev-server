const compress = require("compression");
const connect = require("gulp-connect-php");
import { ServerOption } from "./ServerOption";

/**
 * optionに従い、PHPサーバーかbrowserSyncのいずれかを起動する。
 * @param browserSync
 * @param option
 */
export async function startServer(browserSync, option: ServerOption) {
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
function startPhpServer(browserSync, option: ServerOption): Promise<void> {
  return new Promise((resolve) => {
    connect.server(option, () => {
      browserSync.init(
        {
          proxy: {
            target: "localhost:" + option.port,
            middleware: [compress()],
          },
        },
        () => {
          resolve();
        }
      );
    });
  });
}

function startBSServer(browserSync, option: ServerOption): Promise<void> {
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

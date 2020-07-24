"use strict";
const { series } = require("gulp");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const compress = require("compression");
const portfinder = require("portfinder");

import { getWatch } from "./Watch";
import { ServerOption, initOption, initBaseDir } from "./ServerOption";

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base - webサーバーのルートになるディレクトリ
 * @param [option]
 * @return {{server: server, reload: reload}}
 */
export function get(base: string, option?: ServerOption): Function {
  option = initOption(option, base);
  initBaseDir(option);

  const server = async (done) => {
    option.port = await getPort(option.basePort, option.highestPort);
    option.browserSyncPort = await getPort(
      option.browserSyncBasePort,
      option.browserSyncHighestPort
    );
    startServer(option, done);
  };

  const getPort = async (basePort, highestPort): Promise<number> => {
    portfinder.basePort = basePort;
    portfinder.highestPort = highestPort;
    return portfinder.getPortPromise();
  };

  const startServer = (option, done) => {
    if (option.usePhpDevServer) {
      startPhpServer(option, done);
    } else {
      startBSServer(option, done);
    }
  };

  const startPhpServer = (option, done) => {
    connect.server(option, () => {
      browserSync.init(
        {
          proxy: {
            target: "localhost:" + option.port,
            middleware: [compress()],
          },
        },
        done
      );
    });
  };

  const startBSServer = (option, done) => {
    browserSync.init(
      {
        server: option.base,
        port: option.browserSyncPort,
      },
      done
    );
  };

  return series(server, getWatch(browserSync, option));
}

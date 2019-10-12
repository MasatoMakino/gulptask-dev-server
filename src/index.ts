"use strict";

import { ServerOption, initOption, initBaseDir } from "./ServerOption";

const { watch, series } = require("gulp");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const compress = require("compression");
const portfinder = require("portfinder");
const path = require("path");

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base - webサーバーのルートになるディレクトリ
 * @param [option]
 * @return {{server: server, reload: reload}}
 */
export function get(base: string, option?: ServerOption): Function {
  option = initOption(option, base);
  initBaseDir(option);

  const server = done => {
    portfinder.basePort = option.basePort;
    portfinder.highestPort = option.highestPort;
    portfinder
      .getPortPromise()
      .then(port => {
        option.port = port;
        startServer(option, done);
      })
      .catch(err => {});
  };

  const startServer = (option, done) => {
    connect.server(option, () => {
      browserSync.init(
        {
          proxy: {
            target: "localhost:" + option.port,
            middleware: [compress()]
          }
        },
        done
      );
    });
  };

  const reload = done => {
    browserSync.reload();
    done();
  };

  const watchPath = path.resolve(option.base, "**/*");
  const ignorePath = (option.ignore as string[]).map(val => {
    return "!"+path.resolve(option.base, val);
  });
  const pathArray = [watchPath, ...ignorePath];
  console.log( pathArray );

  const watchTask = () => {
    watch(pathArray, reload);
  };

  return series(server, watchTask);
}

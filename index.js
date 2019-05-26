"use strict";

const { watch, series } = require("gulp");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const compress = require("compression");
const portfinder = require("portfinder");
const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");

/**
 * @typedef Option
 *
 * @param {number} [basePort = 8000]
 * @param {number} [highestPort = 65535]
 */

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param {string} base - webサーバーのルートになるディレクトリ
 * @param {Option} [option]
 * @return {{server: server, reload: reload}}
 */
module.exports = (base, option) => {
  if (option == null) option = {};

  option.base = path.resolve(process.cwd(), base);
  if (option.basePort == null) option.basePort = 8000;
  if (option.highestPort == null) option.highestPort = 65535;

  const isExistBase = fs.existsSync(option.base);
  if (!isExistBase) {
    makeDir.sync(option.base);
  }

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
  const watchTask = () => {
    watch(watchPath, reload);
  };

  return series(server, watchTask);
};
